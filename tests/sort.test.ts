import { test, expect } from "vitest";

import { generateRandomNumbers } from "../src/lib/utils";
import { algorithms } from "../src/lib/implementations";

function finishGenerator(generator: Generator) {
  let result = generator.next();

  while (!result.done) {
    result = generator.next();
  }

  return result.value;
}

test("Bubble sort result must be equal to default sort results", () => {
  const sampleArray = generateRandomNumbers(100, 0, 100);
  const defaultSort = sampleArray.slice().sort((a, b) => a - b);

  finishGenerator(algorithms.bubbleSort.fn(sampleArray));

  expect(sampleArray).toEqual(defaultSort);
});

test("Quick sort result must be equal to default sort results", () => {
  const sampleArray = generateRandomNumbers(100, 0, 100);
  const defaultSort = sampleArray.slice().sort((a, b) => a - b);

  finishGenerator(algorithms.quickSort.fn(sampleArray));

  expect(sampleArray).toEqual(defaultSort);
});
