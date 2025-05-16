import Pagination from './components/Pagination';

export default function Home() {
	return (
		<>
			<h1>Hello world!</h1>
			<Pagination itemCount={100} pageSize={10} currentPage={10} />
		</>
	);
}
