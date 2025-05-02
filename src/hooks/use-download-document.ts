'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import useDownloadDocument from '../api/download-document';

const useDocumentDownload = (url: string) => {
	const { mutateAsync: downloadDocument } = useDownloadDocument();
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const imgType = useMemo(() => {
		if (!url) return null;
		const parts = url.split('.');
		return parts[parts.length - 1] || null;
	}, [url]);

	const getImageUrl = useCallback(async () => {
		if (!url) return;

		try {
			const payload = { key: url };
			const response = await downloadDocument(payload);
			if (response?.data?.signedUrl) {
				setImageUrl(response.data.signedUrl);
			}
		} catch (err) {
			console.error('Error downloading document:', err);
		}
	}, [url]);

	useEffect(() => {
		getImageUrl();
	}, [getImageUrl]);

	return {
		url: imageUrl,
		imgType,
	};
};

export default useDocumentDownload;
