'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Button, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';

// Dynamically load SimpleMDE on client only
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

export default function NewIssuePage() {
	return (
		<div className='max-w-xl space-y-3'>
			<TextField.Root placeholder='Title' />
			<SimpleMDE placeholder='Description' />
			<Button>Submit New Issue</Button>
		</div>
	);
}
