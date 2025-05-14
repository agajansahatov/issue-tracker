'use client';
import { Button } from '@/app/components';
import Link from 'next/link';
import React from 'react';

const NewIssueButton = () => {
	return (
		<div className='my-5'>
			<Button>
				<Link href='/issues/new'>New Issue</Link>
			</Button>
		</div>
	);
};

export default NewIssueButton;
