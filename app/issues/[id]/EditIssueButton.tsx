import { Button } from '@/app/components';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<Link href={`/issues/edit/${issueId}`}>
			<Button asChild className='w-full'>
				<Pencil2Icon />
				Edit Issue
			</Button>
		</Link>
	);
};

export default EditIssueButton;
