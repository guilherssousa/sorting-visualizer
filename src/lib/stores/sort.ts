import { writable } from "svelte/store";

export const sampleController = writable({
  length: 30,
  max: 100,
  min: 0,
});
