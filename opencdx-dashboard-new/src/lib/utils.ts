import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUUID = () => {
  const generateSegment = (length: number, isNumeric: boolean) => {
    const characters = isNumeric
      ? '0123456789'
      : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const segment = [];

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);

      segment.push(characters.charAt(randomIndex));
    }

    return segment.join('');
  };
  const uuid = `${generateSegment(4, false)}-${generateSegment(4, false)}-${generateSegment(4, true)}-${generateSegment(
    5,
    false,
  )}-${generateSegment(4, false)}`;

  return uuid.toUpperCase();
};
