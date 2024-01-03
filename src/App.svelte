<script lang="ts">
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { sineInOut } from 'svelte/easing';

  import Controller from './lib/components/Controller.svelte'

  import { sortController } from './lib/stores/sort';

  import { generateRandomNumbers } from './lib/utils';

  let _i: number | undefined;
  let _j: number | undefined;
  $: sample = generateRandomNumbers($sortController.length, $sortController.min, $sortController.max);

  function swap(i: number, j: number) {
    _i = i;
    _j = j;
    const tmp = sample.numbers[i];
    sample.numbers[i] = sample.numbers[j];
    sample.numbers[j] = tmp;
  }

  function* bubbleSort() {
    for (let i = 0; i < sample.numbers.length; i++) {
      for (let j = 0; j < sample.numbers.length - i - 1; j++) {
        if (sample.numbers[j] > sample.numbers[j + 1]) {
          yield swap(j, j+1)
        }
      }
    }
  }

  onMount(() => {
    const sorter = bubbleSort();
    let frameId: number;
    let lastTime = 0;

    function sortNext(time: number) {
      frameId = requestAnimationFrame(sortNext)

      if (time - lastTime < 400) {
        return;
      }

      lastTime = time;

      const { done } = sorter.next();
      if(done) {
        _i = _j = undefined;
        cancelAnimationFrame(frameId);
      }
    }

    frameId = requestAnimationFrame(sortNext);
    return () => cancelAnimationFrame(frameId);
  })
</script>

<main>
  <div class="bars">
    {#each sample.numbers as item, index (`sample-item-${index}`)}
      <div
        class="item"
        animate:flip={{ easing: sineInOut, duration: 500 }}
      >
        <span style:display={sample.numbers.length > 50 ? "none" : "inline"}>{item}</span>

        <div
          class="bar"
          style:background={(index === _i || index === _j) ? "#4ade80" : "#f0f9ff"}
          style:width={`${720/sample.numbers.length}px`}
          style:height={`${(200*(item/sample.max))}px`}
        >
        </div>

      </div>
    {/each}
  </div>

  <Controller />
</main>

<style>
.bars {
  display: flex;
  column-gap: 16px;
}

.bars .item {
  color: #a1a1aa;
  font-weight: semibold;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bars .item .bar {
  width: 32px;
  max-height: 200px;
  background-color: #f0f9ff;
  border-radius: 0 0 2px 2px;
  margin-bottom: 0.5rem;
}
</style>

