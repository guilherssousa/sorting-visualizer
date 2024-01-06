<script lang="ts">
  import { sampleController } from '../stores/sort';

  export let start: () => void; 
  export let pause: () => void; 
</script>


<footer>
  <div>
    <div class="control-item">
      <label for="sample-size">
        <strong>
          Sample Size:
        </strong>
      </label>

      <input type="number" name="sample-size" required bind:value={$sampleController.length} />
    </div> 

    <div class="control-item">
      <label for="min-value">
        <strong>
          Min. value:
        </strong>
      </label>

      <input
        type="number"
        name="min-value"
        required
        max={$sampleController.max}
        bind:value={$sampleController.min}
      />
    </div> 
    
    <div class="control-item">
      <label for="max-value">
        <strong>
          Max. value:
        </strong>
      </label>

      <input 
        type="number" 
        name="max-value" 
        required 
        min={$sampleController.min} 
        bind:value={$sampleController.max}
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

.timeline-controllers {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 1rem;
}

.timeline-controllers .timeline-button {
  border: 0;
  border-radius: 2px;
  outline: 0;
  padding: 4px;

  height: 24px;
  width: 24px;

  cursor: pointer;
}

.icon {
  color: white;
  width: 16px;
  height: 16px;
}
</style>
