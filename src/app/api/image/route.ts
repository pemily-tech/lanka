import fs from 'fs/promises';
import path from 'path';
import heicConvert from 'heic-convert';
import sharp from 'sharp';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const source = searchParams.get('source');
	const width = parseInt(searchParams.get('w') || '0');
	const height = parseInt(searchParams.get('h') || '0');
	const quality = parseInt(searchParams.get('q') || '75');
	const blur = searchParams.get('blur') === 'true';

	if (!source || (source !== 'local' && source !== 'remote')) {
		return new Response('Missing or invalid source type', { status: 400 });
	}

	let inputBuffer: Buffer;

	try {
		if (source === 'local') {
			const filePath = searchParams.get('path');
			if (!filePath)
				return new Response('Missing local path', { status: 400 });

			const fullPath = path.join(process.cwd(), 'public', filePath);
			inputBuffer = await fs.readFile(fullPath);

			if (filePath.toLowerCase().endsWith('.heic')) {
				inputBuffer = await heicConvert({
					buffer: inputBuffer,
					format: 'JPEG',
					quality: 0.8,
				});
			}
		}

		if (source === 'remote') {
			const imageUrl = searchParams.get('url');
			if (!imageUrl)
				return new Response('Missing image URL', { status: 400 });

			const res = await fetch(imageUrl);
			if (!res.ok) throw new Error('Image fetch failed');
			inputBuffer = Buffer.from(await res.arrayBuffer());

			if (imageUrl.toLowerCase().endsWith('.heic')) {
				inputBuffer = await heicConvert({
					buffer: inputBuffer,
					format: 'JPEG',
					quality: 0.8,
				});
			}
		}

		let sharpImage = sharp(inputBuffer);

		if (width || height) {
			sharpImage = sharpImage.resize({
				width: width || undefined,
				height: height || undefined,
			});
		}

		if (blur) {
			sharpImage = sharpImage.blur();
		}

		const output = await sharpImage
			.webp({ quality: quality || 75 })
			.toBuffer();

		return new Response(output, {
			headers: {
				'Content-Type': 'image/webp',
				'Cache-Control': 'public, max-age=31536000, immutable',
			},
		});
	} catch (err) {
		console.error('Image processing error:', err);
		return new Response('Failed to process image', { status: 500 });
	}
}
