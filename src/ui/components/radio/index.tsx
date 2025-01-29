import React, { type ChangeEvent } from 'react';

interface RadioProps {
	label: string;
	name: string;
	value: string;
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	radioClasses?: string;
	activeClasses?: string;
	labelClasses?: string;
}

export function Radio({
	label,
	name,
	value,
	checked,
	onChange,
	disabled = false,
	radioClasses = 'w-[18px] h-[18px]',
	activeClasses = 'ring-brand border-brand',
	labelClasses = '',
}: RadioProps) {
	return (
		<section>
			<label
				className={`flex items-center gap-8 ${
					disabled
						? 'cursor-not-allowed opacity-50'
						: 'cursor-pointer'
				}`}
			>
				<input
					type="radio"
					className="hidden"
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
				/>
				<span
					className={`relative flex-none rounded-full border-[1.5px] transition-all duration-150 ${
						checked
							? activeClasses +
								' ring-[6px]  ring-inset ring-offset-2'
							: 'border-grey-3'
					} ${radioClasses}`}
				></span>
				<span className={labelClasses}>{label}</span>
			</label>
		</section>
	);
}

export default Radio;
