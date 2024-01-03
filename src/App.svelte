<script lang="ts">
  import Controller from './lib/components/Controller.svelte'

  import { sample } from './lib/stores/sort'
</script>

<main>
  <div class="bars">
    {#each $sample.numbers as item, index (`sample-item-${index}`)}
      <div class="item">
        <div class="bar" style:height={`${(200*(item/$sample.max))}px`} style:width={`${720/$sample.numbers.length}px`}></div>
        <span style:display={$sample.numbers.length > 50 ? "none" : "inline"}>{item}</span>
      </div>
    {/each}
  </div>

  <Controller />
</main>

<style>
.bars {
  display: flex;
  align-items: baseline;
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
  border-radius: 2px 2px 0 0;
  margin-bottom: 0.5rem;
}
</style>

