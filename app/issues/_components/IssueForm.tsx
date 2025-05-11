'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema),
	});

	const [error, setError] = useState('');
	const [isSubmitting, setSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try {
			setSubmitting(true);
			if (issue) {
				axios.patch('/api/issues/' + issue.id, data);
			} else {
				await axios.post('/api/issues', data);
			}
			router.push('/issues');
			router.refresh();
		} catch (error) {
			setSubmitting(false);
			setError(`An unexpected error happened: ${error}`);
		}
	});

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					{error}
				</Callout.Root>
			)}
			<form onSubmit={onSubmit}>
				<ul className='space-y-5'>
					<li>
						<TextField.Root
							defaultValue={issue?.title}
							placeholder='Title'
							{...register('title')}
						/>
						<ErrorMessage>{errors.title?.message}</ErrorMessage>
					</li>
					<li>
						<Controller
							name='description'
							control={control}
							defaultValue={issue?.description}
							render={({ field }) => (
								<SimpleMDE placeholder='Description' {...field} />
							)}
						/>

						<ErrorMessage>{errors.description?.message}</ErrorMessage>
					</li>
					<li>
						<Button className='!cursor-pointer' disabled={isSubmitting}>
							{issue ? 'Update Issue' : 'Submit New Issue'}{' '}
							{isSubmitting && <Spinner />}
						</Button>
					</li>
				</ul>
			</form>
		</div>
	);
};

export default IssueForm;
