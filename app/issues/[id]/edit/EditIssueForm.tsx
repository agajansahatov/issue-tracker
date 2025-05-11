'use client';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';
import { Issue } from '@prisma/client';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

interface Props {
	issue: Issue;
}

const EditIssueForm = ({ issue }: Props) => {
	return <IssueForm issue={issue} />;
};

export default EditIssueForm;
