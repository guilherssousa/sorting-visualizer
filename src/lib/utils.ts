export function generateRandomNumbers(
  length: number = 20,
  min: number = 0,
  max: number = 100,
): { numbers: number[]; max: number } {
  const numbers = Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );

  return { numbers, max: Math.max(...numbers) };
}
