/**
 * Philippine Peso currency formatter for VELOCITY
 */

export function formatPHP(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1_000_000) return `₱${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `₱${(amount / 1_000).toFixed(0)}K`;
  }
  return `₱${amount.toLocaleString('en-PH')}`;
}

export function formatPHPPerDay(amount: number): string {
  return `${formatPHP(amount)} / DAY`;
}

export const PHP_SYMBOL = '₱';
