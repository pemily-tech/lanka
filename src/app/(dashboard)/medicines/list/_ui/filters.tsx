import {
	Command,
	CommandInput,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../../ui/shared';
import { useUpdateUrl } from '../_hooks/use-update-url';

export default function Filters({
	value,
	setValue,
	active,
	setActive,
}: {
	value: string;
	setValue: (s: string) => void;
	active: number;
	setActive: (active: number) => void;
}) {
	const { limit, setLimit } = useUpdateUrl();
	return (
		<div className="flex w-full flex-wrap items-center justify-between gap-12">
			<div className="flex-1">
				<Command className="max-w-[450px] rounded-lg border">
					<CommandInput
						className="py-24"
						placeholder="Search for medicines..."
						value={value}
						onValueChange={setValue}
					/>
				</Command>
			</div>
			<div className="flex flex-1 items-center justify-end gap-12">
				<div>
					<Select
						value={String(active)}
						onValueChange={(val) => setActive(Number(val))}
					>
						<Label>Choose Active / Inactive</Label>
						<SelectTrigger className="mt-3 w-[180px]">
							<SelectValue placeholder="Theme" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Active</SelectItem>
							<SelectItem value="0">Inactive</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={limit.toString()}
						onValueChange={(val) => setLimit(Number(val))}
					>
						<Label>Rows per Page</Label>
						<SelectTrigger className="mt-3 w-[180px]">
							<SelectValue placeholder="Select a limit" />
						</SelectTrigger>
						<SelectContent>
							{[15, 30, 50].map((option) => (
								<SelectItem key={option} value={String(option)}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
