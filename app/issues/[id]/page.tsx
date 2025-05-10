import React from 'react';
import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import delay from 'delay';

interface Props {
	params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
	const { id } = await params;

	if (isNaN(Number(id))) notFound();

	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
	});

	if (!issue) notFound();

	await delay(2000);

	return (
		<div>
			<p>{issue.title}</p>
			<p>{issue.description}</p>
			<p>{issue.status}</p>
			<p>{issue.createdAt.toDateString()}</p>
		</div>
	);
};

export default IssueDetailPage;
