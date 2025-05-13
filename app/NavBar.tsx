'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, Flex } from '@radix-ui/themes';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const NavBar = () => {
	const currentPath = usePathname();
	const { status, data: session } = useSession();

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	];

	return (
		<nav className='border-b border-zinc-200 mb-5 px-5 py-3'>
			<Container>
				<Flex justify='between'>
					<Flex align='center' gap='3'>
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
					</Flex>
					<Box>
						{status === 'authenticated' && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild>
									<Avatar
										src={session.user!.image!}
										fallback='?'
										size='2'
										radius='full'
										className='cursor-pointer'
										referrerPolicy='no-referrer'
									/>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content className='bg-white rounded-md shadow-lg p-2 border border-zinc-200'>
									<DropdownMenu.Label className='px-2 py-1 text-sm text-gray-600'>
										{session.user!.email}
									</DropdownMenu.Label>
									<Link href='/api/auth/signout'>
										<DropdownMenu.Item className='px-2 py-1 rounded'>
											Logout
										</DropdownMenu.Item>
									</Link>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}
						{status === 'unauthenticated' && (
							<Link href='/api/auth/signin'>Login</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
