import sharp from 'sharp';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const imageUrl = searchParams.get('url');
	const width = parseInt(searchParams.get('w') || '0');
	const height = parseInt(searchParams.get('h') || '0');
	const quality = parseInt(searchParams.get('q') || '75');
	const blur = searchParams.get('blur') === 'true';
	console.log(imageUrl, 'imageUrl====');

	if (!imageUrl) {
		return new Response('Missing image URL', { status: 400 });
	}

	try {
		const imageRes = await fetch(imageUrl);
		console.log(imageRes, '====');

		if (!imageRes.ok) throw new Error('Image fetch failed');
		const buffer = await imageRes.arrayBuffer();

		let sharpImage = sharp(Buffer.from(buffer));

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
		console.error(err);
		return new Response('Failed to process image', { status: 500 });
	}
}
