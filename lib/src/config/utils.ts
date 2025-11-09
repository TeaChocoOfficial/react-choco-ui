//-Path: "react-choco-ui/lib/src/config/utils.ts"
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function tw(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
