import { Metadata } from 'next';
import NewIssueLayout from './NewIssueLayout';

const NewIssuePage = () => {
	return <NewIssueLayout />;
};

export default NewIssuePage;

export const metadata: Metadata = {
	title: 'Issue Tracker - New Issue',
	description: 'View all project issues',
};
