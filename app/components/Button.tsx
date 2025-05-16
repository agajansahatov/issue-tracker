'use client';
import React from 'react';
import { Button as RadixButton } from '@radix-ui/themes';

interface Props extends React.ComponentProps<typeof RadixButton> {
	className?: string;
	children: React.ReactNode;
}

const Button = ({ className, children, ...rest }: Props) => {
	return (
		<RadixButton className={`${className}`} {...rest}>
			<span>{children}</span>
		</RadixButton>
	);
};

export default Button;
