import { derived, writable } from "svelte/store";

import { generateRandomNumbers } from "../utils";

const availableAlgorithms = {
  bubble: "Bubble Sort",
  quick: "Quick Sort",
};

const defaultValues = {
  length: 30,
  min: 0,
  max: 100,
};

function createSortStore() {
  const { subscribe, set, update } = writable(defaultValues);

  return {
    subscribe,
    set,
    update,
    reset: () => set(defaultValues),
  };
}

export const sortController = createSortStore();

export const sample = derived(sortController, ($sort) =>
  generateRandomNumbers($sort.length, $sort.min, $sort.max),
);
