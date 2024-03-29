export type StepState = {
  result: number[];
  colors?: Record<number, string>;
};

export type SortingGenerator = Generator<StepState, StepState>;

function* bubbleSort(arr: number[]): SortingGenerator {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield {
        result: arr,
        colors: {
          [j]: "yellow",
          [j + 1]: "green",
        },
      };
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;

        yield {
          result: arr,
          colors: {
            [j]: "green",
            [j + 1]: "yellow",
          },
        };
      } else {
        yield {
          result: arr,
          colors: {
            [j]: "yellow",
            [j + 1]: "yellow",
          },
        };
      }
    }
  }

  return { result: arr };
}

function* partition(list: number[], low: number, high: number) {
  const pivot = list[high];

  let index = low - 1;

  for (let i = low; i < high; i++) {
    yield {
      result: list,
      colors: {
        [high]: "blue",
        [i]: list[i] < pivot ? "green" : "yellow",
        [index]: "red",
      },
    };

    if (list[i] < pivot) {
      index++;

      const tmp = list[index];
      list[index] = list[i];
      list[i] = tmp;
    }
  }

  index++;
  yield {
    result: list,
    colors: {
      [index]: "red",
      [high]: "green",
    },
  };

  list[high] = list[index];
  list[index] = pivot;

  return index;
}

function* quickSort(
  list: number[],
  low: number = 0,
  high: number = list.length - 1,
): SortingGenerator {
  if (low < high) {
    const partitionIndex = yield* partition(list, low, high);

    yield* quickSort(list, low, partitionIndex - 1);
    yield* quickSort(list, partitionIndex + 1, high);
  }

  return { result: list };
}

export const algorithms: Record<
  string,
  { name: string; fn: (list: number[]) => SortingGenerator }
> = {
  bubbleSort: {
    name: "Bubble Sort",
    fn: bubbleSort,
  },
  quickSort: {
    name: "Quick Sort",
    fn: quickSort,
  },
};
