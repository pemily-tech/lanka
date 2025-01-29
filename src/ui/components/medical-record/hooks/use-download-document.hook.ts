'use client';

import { useCallback, useEffect, useState } from 'react';

import useDownloadDocument from '../../../../api/use-download-document/download-document';

const useDocumentDownlaod = ({ url }: { url: string }) => {
	const { mutateAsync: downloadDocument } = useDownloadDocument();
	const [imageUrl, setImageUrl] = useState<string | null>();
	const urlType = url?.split('.'),
		imgType = urlType && urlType[urlType.length - 1];

	const getImageUrl = useCallback(async () => {
		try {
			const payload = { key: url as string };
			const response = await downloadDocument(payload);
			if (response?.data?.signedUrl) {
				setImageUrl(response?.data?.signedUrl);
			}
		} catch (err) {
			console.debug(err);
		}
	}, [url]);

	useEffect(() => {
		getImageUrl();
	}, []);

	return {
		url: imageUrl,
		imgType,
	};
};

export default useDocumentDownlaod;
