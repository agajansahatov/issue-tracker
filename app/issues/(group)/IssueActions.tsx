import { Button } from '@/app/components';
import { Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';

const IssueActions = async () => {
	const session = await getServerSession(authOptions);

	return (
		<Flex mb='5' justify='between'>
			<IssueStatusFilter />
			{session && (
				<Button>
					<Link href='/issues/new'>New Issue</Link>
				</Button>
			)}
		</Flex>
	);
};

export default IssueActions;
