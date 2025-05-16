import { IssueStatusBadge, Link } from '@/app/components';
import NextLink from 'next/link';
import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props {
	searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
	const columns: {
		label: string;
		value: keyof Issue;
		className?: string;
	}[] = [
		{ label: 'Issue', value: 'title' },
		{ label: 'Status', value: 'status', className: 'hidden md:table-cell' },
		{ label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
	];

	const queryParams = await searchParams;
	const status = queryParams.status;
	const statuses = Object.values(Status);

	const statusValidated = statuses.includes(status) ? status : undefined;
	const where = { status: statusValidated };

	const orderBy = columns
		.map((column) => column.value)
		.includes(queryParams.orderBy)
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
		<>
			<IssueActions />

			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeaderCell
								key={column.value}
								className={column.className}
							>
								<NextLink
									href={{
										query: {
											...queryParams,
											orderBy: column.value,
										},
									}}
									className='hover:underline'
								>
									{column.label}
								</NextLink>
								{column.value === queryParams.orderBy && (
									<ArrowUpIcon className='inline' />
								)}
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className='block md:hidden'>
									{<IssueStatusBadge status={issue.status} />}
								</div>
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								{<IssueStatusBadge status={issue.status} />}
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemCount={issueCount}
				className='py-5'
			/>
		</>
	);
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
