export function generateRandomNumbers(
  length: number = 20,
  min: number = 0,
  max: number = 100,
): number[] {
  console.time("generateRandomNumbers");
  const numbers = Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min + 1) + min),
  );

  console.timeEnd("generateRandomNumbers");

  return numbers;
}
