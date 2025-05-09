'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';

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

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					{error}
				</Callout.Root>
			)}
			<form
				className='space-y-5'
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post('/api/issues', data);
						router.push('/issues');
					} catch (error) {
						setError(`An unexpected error happened: ${error}`);
					}
				})}
			>
				<TextField.Root placeholder='Title' {...register('title')} />
				{errors.title && (
					<Text color='red' as='p' className='pb-3'>
						{errors.title.message}
					</Text>
				)}
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				{errors.description && (
					<Text color='red' as='p' className='pb-3'>
						{errors.description.message}
					</Text>
				)}

				<Button className='!cursor-pointer'>Submit New Issue</Button>
			</form>
		</div>
	);
}
