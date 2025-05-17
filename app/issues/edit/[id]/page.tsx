import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import EditIssueForm from './EditIssueForm';

interface Props {
	params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
	const { id } = await params;
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
	});

	if (!issue) notFound();

	return <EditIssueForm issue={issue} />;
};

export default EditIssuePage;

export async function generateMetadata({ params }: Props) {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt((await params).id) },
	});

	return {
		title: 'Edit the issue "' + issue?.title + '"',
		description: 'Edit the issue ' + issue?.id,
	};
}
