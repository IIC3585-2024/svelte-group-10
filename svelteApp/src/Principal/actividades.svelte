<script>
    import { fetchParks, parks, isLoading, errorMessage } from '../api';
    import ParkDetail from '../Componentes/parques.svelte';
    import { onMount } from "svelte";
    import {filteredParks } from '../stores'; 
    import Carousel from '../Componentes/carrusel.svelte';

    onMount(() => {
        fetchParks();
    });
  </script>
<main>
  <Carousel images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]} />

    {#if $isLoading}
      <p>Loading parks...</p>
    {:else if $errorMessage}
      <p>Error: {$errorMessage}</p>
    {:else}
      <div class="grid-container">
      {#each $filteredParks.length > 0 ? $filteredParks : $parks as park}
          <ParkDetail {park} />
      {/each}
      </div>
    {/if}
  </main>
  
  <style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px; 
    padding: 20px;
  }
  </style>
  