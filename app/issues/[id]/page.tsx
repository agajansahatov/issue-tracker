import { Button } from '@/app/components';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/prisma/client';
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

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

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap='5'>
			<Box>
				<Heading>{issue.title}</Heading>
				<Flex className='gap-3' my='2'>
					<IssueStatusBadge status={issue.status} />
					<Text>{issue.createdAt.toDateString()}</Text>
				</Flex>
				<Card className='prose' mt='4'>
					<ReactMarkdown>{issue.description}</ReactMarkdown>
				</Card>
			</Box>
			<Box>
				<Link href={`/issues/${issue.id}/edit`}>
					<Button asChild>
						<Pencil2Icon />
						Edit Issue
					</Button>
				</Link>
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
