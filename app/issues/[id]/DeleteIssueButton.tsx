import { Button } from '@/app/components';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	console.log(issueId);

	return (
		<Button color='red' className='w-full' asChild>
			Delete Issue
		</Button>
	);
};

export default DeleteIssueButton;
