'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

// Dynamically load SimpleMDE on client only
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
	const router = useRouter();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});

	const [error, setError] = useState('');
	const [isSubmitting, setSubmitting] = useState(false);

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					{error}
				</Callout.Root>
			)}
			<form
				onSubmit={handleSubmit(async (data) => {
					try {
						setSubmitting(true);
						await axios.post('/api/issues', data);
						router.push('/issues');
					} catch (error) {
						setSubmitting(false);
						setError(`An unexpected error happened: ${error}`);
					}
				})}
			>
				<ul className='space-y-5'>
					<li>
						<TextField.Root placeholder='Title' {...register('title')} />
						<ErrorMessage>{errors.title?.message}</ErrorMessage>
					</li>
					<li>
						<Controller
							name='description'
							control={control}
							render={({ field }) => (
								<SimpleMDE placeholder='Description' {...field} />
							)}
						/>

						<ErrorMessage>{errors.description?.message}</ErrorMessage>
					</li>
					<li>
						<Button className='!cursor-pointer' disabled={isSubmitting}>
							Submit New Issue {isSubmitting && <Spinner />}
						</Button>
					</li>
				</ul>
			</form>
		</div>
	);
}
