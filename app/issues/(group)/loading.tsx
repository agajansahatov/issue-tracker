import { Table } from '@radix-ui/themes';
import React from 'react';
import { Skeleton } from '@/app/components';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';

const LoadingIssuesPage = async () => {
	const session = await getServerSession(authOptions);

	const issues = [1, 2, 3, 4, 5];

	return (
		<>
			{session && (
				<div className='my-5'>
					<Skeleton height='1.5rem' width='5rem' />
				</div>
			)}

			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>
							Status
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>
							Created
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue}>
							<Table.Cell>
								<Skeleton />
								<div className='block md:hidden'>
									<Skeleton />
								</div>
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								<Skeleton />
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								<Skeleton />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</>
	);
};

export default LoadingIssuesPage;
