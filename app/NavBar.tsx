'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, Flex } from '@radix-ui/themes';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Skeleton } from '@/app/components';

const NavBar = () => {
	return (
		<nav className='border-b border-zinc-200 mb-5 px-5 py-3'>
			<Container>
				<Flex justify='between'>
					<Flex align='center' gap='3'>
						<Link href='/'>
							<AiFillBug />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === 'loading') return <Skeleton width='3rem' />;

	if (status === 'unauthenticated')
		return (
			<Link href='/api/auth/signin' className='nav-link'>
				Login
			</Link>
		);

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<Avatar
						src={session!.user!.image!}
						fallback='?'
						size='2'
						radius='full'
						className='cursor-pointer'
						referrerPolicy='no-referrer'
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content className='bg-white rounded-md shadow-lg p-2 border border-zinc-200'>
					<DropdownMenu.Label className='px-2 py-1 text-sm text-gray-600'>
						{session!.user!.email}
					</DropdownMenu.Label>
					<Link href='/api/auth/signout'>
						<DropdownMenu.Item className='px-2 py-1 rounded'>
							Logout
						</DropdownMenu.Item>
					</Link>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

const NavLinks = () => {
	const currentPath = usePathname();

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	];

	return (
		<ul className='flex space-x-6'>
			{links.map((link) => (
				<li key={link.label}>
					<Link
						href={link.href}
						className={classNames({
							'nav-link': true,
							'!text-black': link.href === currentPath,
						})}
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavBar;
