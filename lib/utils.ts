import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanUrl(url: string): string {
  const baseUrl = url.split('/api/')[0]; 
  return `${baseUrl}/api/`;
}