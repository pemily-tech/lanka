'use client';

import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useUpdateMedicalRecord from '../../../../api/use-update-medical-record/update-medical-record';
import { Button } from '../../../shared/button';
import Modal from '../../modal/modal';
import Textarea from '../../textarea';

const validationSchema = yup.object().shape({
	comment: yup.string().required('Comment is required'),
});

const CommentModal = ({
	isOpen,
	handleClose,
	id,
	comment,
	refetch,
	activeFilter,
}: {
	isOpen: boolean;
	handleClose: () => void;
	id: string;
	comment: string;
	refetch: () => void;
	activeFilter: string;
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const { mutate: updateMedicalRecord, isPending } = useUpdateMedicalRecord({
		id,
		refetch,
		handleClose,
	});

	useEffect(() => {
		if (comment && comment !== '') {
			setValue('comment', comment);
		}
	}, [comment]);

	const onSubmit = (values: { comment: string }) => {
		const commentData = {
			type: activeFilter,
			comment: values.comment,
		};
		updateMedicalRecord(commentData);
	};

	return (
		<Modal isOpen={isOpen} handleClose={handleClose}>
			<section className="rounded-8 mx-auto max-w-xl bg-white">
				<p className="text-18 border-grey-border1 border-b px-16 py-12 font-semibold">
					Edit Comment
				</p>
				<form className="p-16" onSubmit={handleSubmit(onSubmit)}>
					<Textarea
						label="Comment"
						name="comment"
						placeholder=""
						error={errors?.comment}
						register={register}
					/>
					<Button
						disabled={isPending}
						loading={isPending}
						className="mt-32 w-full"
					>
						<span className="font-black tracking-[-0.41px]">
							Save Notes
						</span>
					</Button>
				</form>
			</section>
		</Modal>
	);
};

export default memo(CommentModal);
