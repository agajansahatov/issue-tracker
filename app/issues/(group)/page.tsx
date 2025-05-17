import Pagination from '@/app/components/Pagination';
import { prisma } from '@/prisma/client';
import { Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface Props {
	searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
	const queryParams = await searchParams;
	const status = queryParams.status;
	const statuses = Object.values(Status);

	const statusValidated = statuses.includes(status) ? status : undefined;
	const where = { status: statusValidated };

	const orderBy = columnNames.includes(queryParams.orderBy)
		? { [queryParams.orderBy]: 'asc' }
		: undefined;

	const page = parseInt(queryParams.page) || 1;
	const pageSize = 10;

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const issueCount = await prisma.issue.count({ where });

	return (
		<Flex direction='column' gap='5'>
			<IssueActions />
			<IssueTable searchParams={queryParams} issues={issues} />
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemCount={issueCount}
			/>
		</Flex>
	);
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

export const metadata: Metadata = {
	title: 'Issue Tracker - Issue List',
	description: 'View all project issues',
};
