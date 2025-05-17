import { prisma } from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import AssigneeSelect from './AssigneeSelect';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

interface Props {
	params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);

	const { id } = await params;

	if (isNaN(Number(id))) notFound();

	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
	});

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', sm: '5' }} gap='5'>
			<Box className='md:col-span-4'>
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Box>
					<Flex direction='column' gap='4'>
						<AssigneeSelect issue={issue} />
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt((await params).id) },
	});

	return {
		title: issue?.title,
		description: 'Details of issue ' + issue?.id,
	};
}
