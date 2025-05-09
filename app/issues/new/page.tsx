'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

// Dynamically load SimpleMDE on client only
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

interface IssueForm {
	title: string;
	description: string;
}

export default function NewIssuePage() {
	const router = useRouter();
	const { register, control, handleSubmit } = useForm<IssueForm>();
	const [error, setError] = useState('');

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					{error}
				</Callout.Root>
			)}
			<form
				className='space-y-3'
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post('/api/issues', data);
						router.push('/issues');
					} catch (error: any) {
						let errorMessage = error.response.data.title._errors[0];
						if (!errorMessage) errorMessage = error;
						setError(`An unexpected error happened: ${errorMessage}`);
					}
				})}
			>
				<TextField.Root placeholder='Title' {...register('title')} />
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>

				<Button className='!cursor-pointer'>Submit New Issue</Button>
			</form>
		</div>
	);
}
