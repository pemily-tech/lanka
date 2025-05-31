'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDownloadDocument } from '../api/mutations/download-document';

const useDocumentDownload = (url: string, publicDoc = false) => {
	const { mutateAsync: downloadDocument, isPending } = useDownloadDocument();
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const imgType = useMemo(() => {
		if (!url) return null;
		const parts = url.split('.');
		return parts[parts.length - 1] || null;
	}, [url]);

	const getImageUrl = useCallback(async () => {
		if (!url) return;
		const payload = { key: url, publicDoc };
		const response = await downloadDocument(payload);
		if (response?.data?.signedUrl) {
			setImageUrl(response.data.signedUrl);
		}
	}, [url]);

	useEffect(() => {
		getImageUrl();
	}, [getImageUrl]);

	return {
		url: imageUrl,
		imgType,
		isPending,
	};
};

export default useDocumentDownload;
