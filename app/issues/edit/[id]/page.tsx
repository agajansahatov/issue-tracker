import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import EditIssueForm from './EditIssueForm';
import { cache } from 'react';

interface Props {
	params: Promise<{ id: string }>;
}

const fetchIssue = cache((issueId: number) =>
	prisma.issue.findUnique({ where: { id: issueId } }),
);

const EditIssuePage = async ({ params }: Props) => {
	const { id } = await params;
	const issue = await fetchIssue(parseInt(id));

	if (!issue) notFound();

	return <EditIssueForm issue={issue} />;
};

export default EditIssuePage;

export async function generateMetadata({ params }: Props) {
	const issue = await fetchIssue(parseInt((await params).id));

	return {
		title: 'Edit the issue "' + issue?.title + '"',
		description: 'Edit the issue ' + issue?.id,
	};
}
