export const clamp = (range: [number, number], value: number): number => {
  if (value < range[0]) return range[0];
  if (value > range[1]) return range[1];
  return value;
};

export const mod = (a: number, b: number) => ((a % b) + b) % b;
