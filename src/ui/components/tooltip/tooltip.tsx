/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { type ReactNode } from 'react';
import Tippy from '@tippyjs/react';

interface ITooltipProps {
	children: any;
	content?: ReactNode | string;
	title?: string;
	className?: string;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	arrow?: boolean;
	theme?: 'light' | 'dark' | 'light-border';
	animation?: string;
	trigger?: string;
	interactive?: boolean;
	allowHTML?: boolean;
	maxWidth?: number | string;
	duration?: number | [number, number];
}

export function Tooltip({
	children,
	content = 'content',
	placement = 'top',
	arrow = true,
	theme = 'dark',
	animation = 'shift-away',
	trigger = 'mouseenter focus',
	interactive = false,
	allowHTML = false,
	maxWidth = 300,
	duration = 200,
}: ITooltipProps) {
	return (
		<div className="custom-tippy">
			<Tippy
				content={content}
				placement={placement}
				arrow={arrow}
				theme={theme}
				animation={animation}
				trigger={trigger}
				interactive={interactive}
				allowHTML={allowHTML}
				maxWidth={maxWidth}
				duration={duration}
			>
				{children}
			</Tippy>
		</div>
	);
}

export default Tooltip;
