<script lang="ts">
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { sineInOut } from 'svelte/easing';

  import { sampleController } from './lib/stores/sort'

  import Controller from './lib/components/Controller.svelte'

  import { generateRandomNumbers } from './lib/utils';
  import { algorithms, type SortingGenerator, type StepState } from './lib/implementations';

  let algorithmKey = "quickSort";

  let selectedAlgorithm = algorithms[algorithmKey];

  let sortingGenerator: SortingGenerator;
  $: sortingGenerator = selectedAlgorithm.fn(generateRandomNumbers($sampleController.length, $sampleController.min, $sampleController.max))

  let sortState: IteratorResult<StepState>;
  $: sortState = sortingGenerator.next();

  $: reset = () => {
    sortingGenerator = selectedAlgorithm.fn(generateRandomNumbers($sampleController.length, $sampleController.min, $sampleController.max));
    sortState = sortingGenerator.next();
  }

  const nextStep = () => {
    if(!sortState.done) {
      const next = sortingGenerator.next();
      sortState = next;
    }
  }

  let lastCalled = 0;
  let delta = 0;
  let time = 0;

  // use a requestAnimationFrame loop to animate the sort
  const start = () => {
    const loop = () => {
      if(time - lastCalled > delta) {
        if(!sortState.done) {
          nextStep();
          lastCalled = time;
          time = requestAnimationFrame(loop);
        }
      }
    }
    time = requestAnimationFrame(loop);
  }

  const pause = () => {
    cancelAnimationFrame(time);
  }

  onMount(() => {
    reset()
  })

</script>

<main>
  <div class="bars">
    {#if sortState}
      {#each sortState.value.result as item, index (`sample-item-${index}`)}
        <div
          class="item"
          animate:flip={{ easing: sineInOut, duration: 500 }}
        >
          <span style:display={sortState.value.result.length > 50 ? "none" : "inline"}>{item}</span>

          <div
            class="bar"
            style:background-color={sortState.value.colors?.[index] ?? "#f0f9ff"}
            style:width={`${720/sortState.value.result.length}px`}
            style:height={`${item / $sampleController.max * 400}px`}
          >
          </div>

        </div>
      {/each}
    {/if}
  </div>

  <Controller {start} {pause} />
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
  max-height: 400px;
  background-color: #f0f9ff;
  border-radius: 0 0 2px 2px;
  margin-bottom: 0.5rem;
}
</style>

