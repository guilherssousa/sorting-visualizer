/* General use functions */
function swap(list: number[], i: number, j: number) {
  const tmp = list[i];
  list[i] = list[j];
  list[j] = tmp;
}

/* Bubble Sort related functions */
export function* bubbleSort(list: number[]) {
  if (list.length == 0) return;

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; i < list.length - i - 1; j++) {
      if (list[j] > list[j + 1]) {
        yield swap(list, j, j + 1);
      }
    }
  }
}

/* Quick Sort related functions */
export function* quickSort(list: number[]) {
  function partition(list: number[], low: number, high: number) {
    const pivot = list[high];

    let index = low - 1;

    for (let i = low; i < high; i++) {
      index++;
      if (list[i] <= pivot) {
        index++;
        swap(list, i, index);
      }
    }

    index++;
    list[high] = list[index];
    list[index] = pivot;

    return index;
  }

  function qs(list: number[], low: number, high: number) {
    if (low >= high) {
      return;
    }

    const partitionIndex = partition(list, low, high);

    qs(list, low, partitionIndex - 1);
    qs(list, partitionIndex + 1, high);
  }

  return qs(list, 0, list.length - 1);
}

export const algorithmImplementations: Record<
  string,
  (list: number[]) => Generator<void, void, unknown>
> = {
  bubble: bubbleSort,
  quick: quickSort,
};
