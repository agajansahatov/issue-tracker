import Pagination from './components/Pagination';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ page: string }>;
}) {
	return (
		<>
			<h1>Hello world!</h1>
			<Pagination
				itemCount={100}
				pageSize={10}
				currentPage={parseInt((await searchParams).page) || 1}
			/>
		</>
	);
}
