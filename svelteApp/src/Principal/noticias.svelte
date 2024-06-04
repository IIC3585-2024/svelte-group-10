<script>
    import { onMount } from 'svelte';
    import { fetchEvents, events, isLoading, errorMessage } from '../api';

    onMount(fetchEvents);
  </script>
  
  {#if $isLoading}
    <p>Loading events...</p>
  {:else if $errorMessage}
    <p>{$errorMessage}</p>
  {:else}
    <div>
      <h1>Upcoming Events</h1>
      {#each $events as event}
        <div class="event">
          <h2>{event.title}</h2>
          <p><strong>When:</strong> {event.datestart} - {event.dateend}</p>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Location:</strong> {event.location}</p>
          {#if event.isfree === 'true'}
            <p>This event is free of charge.</p>
          {:else}
            <p><strong>Cost:</strong> {event.feeinfo}</p>
          {/if}
          {#if event.reservationrequired === 'true'}
            <p>Reservation is required.</p>
          {:else}
            <p>No reservation required.</p>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
  
  <style>
    .event {
      border: 1px solid #ccc;
      padding: 10px;
      margin-top: 10px;
    }
  </style>
  