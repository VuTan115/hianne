export function clamp(n: number, min: number, max: number): number {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}
export function percentToNumber(str: string): number {
  return clamp(parseInt(str), 0, 100);
}

export const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const convertVndStringToNumber = (vndString: string) =>
  parseFloat(vndString.replace(/[^\d.]/g, '').replace('.', ''));
