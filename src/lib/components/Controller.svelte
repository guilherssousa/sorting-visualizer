<script lang="ts">
  import { sampleController } from '../stores/sort';

  import { algorithms } from '../implementations';

  export let start: () => void; 
  export let pause: () => void; 

  let length: number = $sampleController.length;
  let min: number = $sampleController.min;
  let max: number = $sampleController.max;

  let timeout: number;

  function debounce(fn: Function) {
    if(timeout) { 
      console.log("Cleaning timeout...")
      clearTimeout(timeout)
    };
    console.log("Starting timeout...")
    timeout = setTimeout(fn, 500);
  }
</script>

<footer>
  <div>
    <div class="control-item">
      <label for="selected-algoritm">
        <strong>
          Sorting algorithm:
        </strong>
      </label>

      <select name="selected-algorithm" bind:value={$sampleController.algorithmKey}>
        {#each Object.entries(algorithms) as [_algorithmKey, algorithm] (_algorithmKey)}
          <option value={_algorithmKey}>{algorithm.name}</option>
        {/each}
      </select>
    </div> 

    <div class="control-item">
      <label for="sample-size">
        <strong>
          Sample Size: {length}
        </strong>
      </label>

      <input 
        type="range"
        name="sample-size"
        required
        placeholder="Sample size"      
        min="1"
        max="2000"
        bind:value={length}
        on:input={() => debounce(() => $sampleController.length = length)}
      />
    </div>

    <div class="control-item">
      <label for="min-value">
        <strong>
          Min. value: {min}
        </strong>
      </label>

      <input
        type="range"
        name="min-value"
        required
        placeholder="Minimum value"
        max={min}
        bind:value={min}
        on:input={() => debounce(() => $sampleController.min = min)}
      />
    </div> 
    
    <div class="control-item">
      <label for="max-value">
        <strong>
          Max. value: {max}
        </strong>
      </label>

      <input 
        type="range" 
        name="max-value" 
        required 
        placeholder="Maximum value"
        min={$sampleController.min}
        max={1000}
        bind:value={max}
        on:input={() => debounce(() => $sampleController.max = max)}
      />
    </div> 

    <button on:click={start}>Sort</button>
    <button on:click={pause}>Pause</button>
  </div>
</footer>

<style>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: #242424;

  height: 64px;
  width: 100%;

  display: flex;
  align-items: center;

  box-shadow: 0 0 10px 10px rgba(0,0,0,.1);
}

footer > div {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;

  display: flex;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 16px;
} 

.control-item input {
  width: 100px;
}

.control-item + .control-item {
  margin-left: 16px;
}
</style>
