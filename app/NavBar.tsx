'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {
	const currentPath = usePathname();
	const { status } = useSession();

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	];

	return (
		<nav className='flex space-x-6 border-b border-zinc-200 mb-5 px-5 h-14 items-center'>
			<Link href='/'>
				<AiFillBug />
			</Link>
			<ul className='flex space-x-6'>
				{links.map((link) => (
					<li key={link.label}>
						<Link
							href={link.href}
							className={classNames({
								'text-black': link.href === currentPath,
								'text-zinc-500': link.href !== currentPath,
								'hover:text-zinc-800 transition-colors': true,
							})}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			<Box>
				{status === 'authenticated' && (
					<Link href='/api/auth/signout'>Logout</Link>
				)}
				{status === 'unauthenticated' && (
					<Link href='/api/auth/signin'>Login</Link>
				)}
			</Box>
		</nav>
	);
};

export default NavBar;
