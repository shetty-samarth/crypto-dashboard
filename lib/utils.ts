import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a localized currency string.
 *
 * @param value - numeric value to format
 * @param currency - 3-letter currency code (default: 'USD')
 * @param locale - locale string (default: 'en-US')
 * @param opts - additional Intl.NumberFormat options
 * @returns formatted currency string, or '-' when value is null/NaN
 */
export function formatCurrency(
  value: number | null | undefined,
  currency = 'USD',
  locale = 'en-US',
  opts?: Intl.NumberFormatOptions,
): string {
  if (value == null || !isFinite(value)) return '-';

  const defaultOpts: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  };

  const formatOpts = { ...defaultOpts, ...(opts ?? {}) };

  return new Intl.NumberFormat(locale, formatOpts).format(value);
}
