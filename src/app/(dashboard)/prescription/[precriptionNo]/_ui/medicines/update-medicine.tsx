import { useState } from 'react';

import { type IMedicine } from '../../../../../../types/prescription';
import { useMedicineStore } from '../../_store/medicine-store';
import SelectMedicineType from './select';

import { Button } from '@/ui/button';
import { DialogClose } from '@/ui/dialog';

export default function UpdateMedicine({ medicine }: { medicine: IMedicine }) {
	const [localData, setLocalData] = useState<IMedicine>(medicine);

	const updateFullMedicine = useMedicineStore((s) => s.updateFullMedicine);

	return (
		<div>
			<div className="flex flex-col gap-16">
				<div className="flex flex-row">
					<div className="text-black-1/60 w-[120px] font-semibold">
						Name:
					</div>
					<div className="flex-1">{localData.name}</div>
				</div>
				{(
					[
						['dose', 'Dose', 'MEDICINE_DOSE'],
						['duration', 'Duration', 'MEDICINE_DURATION'],
						['frequency', 'Frequency', 'MEDICINE_FREQUENCY'],
						['interval', 'Interval', 'MEDICINE_INTERVAL'],
						['take', 'Take', 'MEDICINE_TAKE'],
					] as [keyof IMedicine, string, string][]
				).map(([name, label, option]) => (
					<div className="flex flex-row" key={name}>
						<div className="text-black-1/60 w-[120px] font-semibold">
							{label}:
						</div>
						<SelectMedicineType
							value={localData[name] as string}
							label={label}
							apiKey={option}
							onChange={(val) =>
								setLocalData((prev) => ({
									...prev,
									[name]: val,
								}))
							}
						/>
					</div>
				))}
				<div className="flex flex-row">
					<div className="text-black-1/60 w-[120px] font-semibold">
						Strength:
					</div>
					<div className="flex-1">{localData.strength}</div>
				</div>
			</div>
			<div className="mt-16 flex flex-row justify-end gap-16 border-t pt-16">
				<Button
					onClick={() =>
						updateFullMedicine(localData.medicineId, localData)
					}
					size="lg"
					className="px-24 font-normal"
				>
					Update
				</Button>
				<DialogClose asChild>
					<Button
						size="lg"
						variant="outline"
						className="px-24 font-normal"
					>
						Cancel
					</Button>
				</DialogClose>
			</div>
		</div>
	);
}
