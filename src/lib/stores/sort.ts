import { writable } from "svelte/store";

import { play, pause } from "./global";

type SortState = {
  array: number[];
  isPlaying: boolean;
  reset: boolean;
  time: number;
  speed: number;
  timeIntervalId?: number;
};

const initialState: SortState = {
  array: [],
  isPlaying: false,
  reset: false,
  time: 0,
  speed: 5,
  timeIntervalId: undefined,
};

function createSortStore() {
  const { subscribe, set, update } = writable(initialState);

  function setArray(newArray: number[]) {
    update((state) => {
      return { ...state, array: newArray };
    });
  }

  function setPlaying(isPlaying: boolean) {
    isPlaying ? play() : pause();

    update((state) => {
      const newState = { ...state, isPlaying };

      if (!state.isPlaying && state.timeIntervalId) {
        clearInterval(state.timeIntervalId);
        newState.timeIntervalId = undefined;
      }

      return newState;
    });
  }

  function setIntervalId(intervalId: number) {
    update((state) => {
      return { ...state, timeIntervalId: intervalId };
    });
  }

  function incrementTime() {
    update((state) => {
      return { ...state, time: ++state.time };
    });
  }

  function setReset() {
    update((state) => {
      pause();
      return { ...state, reset: !state.reset, time: 0 };
    });
  }

  function setSpeed(speed: number) {
    update((state) => {
      return { ...state, speed };
    });
  }

  return {
    subscribe,
    setArray,
    setPlaying,
    setIntervalId,
    incrementTime,
    setReset,
    setSpeed,
  };
}

export const sort = createSortStore();
