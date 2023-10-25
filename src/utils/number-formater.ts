export function clamp(n: number, min: number, max: number): number {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}
export function percentToNumber(str: string): number {
  return clamp(parseInt(str), 0, 100);
}