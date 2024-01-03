<script lang="ts">
  import { sortController } from '../stores/sort';
</script>


<footer>
  <div>
    <!-- <div class="control-item"> -->
    <!--   <label for="algorithm"> -->
    <!--     <strong> -->
    <!--       Sorting Algorithm: -->
    <!--     </strong> -->
    <!--   </label> -->
    <!---->
    <!--   <select bind:value={$sortController.algorithm}> -->
    <!--     {#each Object.entries($sortController.availableAlgorithms) as algo} -->
    <!--       <option value={algo[0]}> -->
    <!--         {algo[1]} -->
    <!--       </option> -->
    <!--     {/each} -->
    <!--   </select> -->
    <!-- </div>  -->

    <div class="control-item">
      <label for="sample-size">
        <strong>
          Sample Size:
        </strong>
      </label>

      <input type="number" name="sample-size" required bind:value={$sortController.length} />
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
        max={$sortController.max}
        bind:value={$sortController.min}
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
        min={$sortController.min} 
        bind:value={$sortController.max}
      />
    </div> 

    <!-- <div class="timeline-controllers"> -->
    <!--   <button class="timeline-button" on:click={startSort}> -->
    <!--     <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> -->
    <!--       <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /> -->
    <!--     </svg> -->
    <!--   </button> -->
    <!-- </div> -->
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
