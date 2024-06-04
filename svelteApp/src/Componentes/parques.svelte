<script>
  import { onMount } from 'svelte';
  import { user, isLoggedIn } from '../stores';
  import { toggleParkParticipant, fetchParkParticipants } from '../firebase';
  export let park;

  let expanded = false;
  let participants = [];
  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const toggle = () => {
    expanded = !expanded;
  };

  const handleClickOutside = event => {
    if (expanded && !event.target.closest('.popup') && !event.target.closest('.park-header')) {
      expanded = false;
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    fetchParkParticipants(park.id, (data) => {
      participants = data;
    });
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function handleToggleParticipation() {
    // @ts-ignore
    const isParticipant = participants.some(p => p.email === $user.email);
    if (isParticipant) {
        // @ts-ignore
        participants = participants.filter(p => p.email !== $user.email);
    } else {
        // @ts-ignore
        if (!participants.some(p => p.email === $user.email)) {
            // @ts-ignore
            participants.push({ name: $user.displayName, photoURL: $user.photoURL, email: $user.email });
        }
    }
    // Actualizar Firebase y UI simultáneamente
    toggleParkParticipant(park.id, $user, isParticipant);
    participants = participants.slice(); // Trigger reactivity in Svelte
}

  const sortHours = (hours) => {
    return Object.entries(hours).sort((a, b) => dayOrder.indexOf(a[0]) - dayOrder.indexOf(b[0]));
  };

  function hourStatus(time) {
    return time.toLowerCase() === "closed" ? "closed" : "open";
  };
</script>

<main>
<div class="park-container">
  <button on:click={toggle} class="park-header">
    {#if park.images.length}
      <img class="park-thumb" src={park.images[0].url} alt={park.images[0].altText} />
    {/if}
    <h1 class="park-title">{park.fullName}</h1>
  </button>
  
  {#if expanded}
  <div class="popup-overlay">
    <div class="popup">
      <div class="popup-content">
        <button class="close-button" on:click={toggle}>Close</button>
        <div class="info-left">
          <h2>{park.fullName}</h2>
          <p class="park-description">{park.description}</p>
          {#if park.images.length}
            <img class="park-image" src={park.images[0].url} alt={park.images[0].altText}>
          {/if}
          <ul class="activities-list">
            <h3>Actividades</h3>
            {#each park.activities as activity}
              <li>{activity.name}</li>
            {/each}
          </ul>
        </div>
        <div class="info-right">
          {#if park.operatingHours.length}
            <h3>Operating Hours</h3>
            {#each park.operatingHours as hours}
              <div class="hours">
                <p><strong>{hours.name}</strong></p>
                <p>{hours.description}</p>
                {#if hours.standardHours}
                  <div class="standard-hours">
                    {#each sortHours(hours.standardHours) as [day, time]}
                    <p class={hourStatus(time)}><strong>{day}:</strong> {time}</p>
                    {/each}
                  </div>
                {/if}

                {#if $isLoggedIn}
                <h3>Participantes de las actividades del parque</h3>
                <button on:click={handleToggleParticipation}>
                  {participants.some(p => p.email === $user.email) ? 'Salir del parque' : 'Unirse al parque'}
                </button>
                <div class="participants">
                  {#each participants as participant}
                    <div class="participant">
                      <img src={participant.photoURL} alt={participant.name} class="participant-photo"/>
                      <p>{participant.name}</p>
                    </div>
                  {/each}
                </div>
              {/if}
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
  {/if}
</div>
</main>

  <style>
    .park-container {
      display: flex;
      flex-direction: column;
      margin: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
  
    .park-header {
      background: none;
      border: none;
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      overflow: hidden;
    }
  
    .park-thumb {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      object-fit: cover;
      border-radius: 50%;
    }
  
    .park-title {
      font-size: 14px;
      color: darkblue;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
  
    .popup {
      background-color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      width: 90%; /* Aumentar el ancho del popup */
      max-width: 1000px; /* Ancho máximo del popup */
      max-height: 80%; /* Altura máxima del popup */
      overflow-y: auto; /* Permitir desplazamiento vertical */
      padding: 20px;
    }
  
    .popup-content {
    display: flex;
    flex-direction: row; /* Cambiado de column a row */
    align-items: start; /* Alinea los elementos al inicio del contenedor */
  }

    .info-left, .info-right {
    flex: 1;
    padding: 10px;
  }

    .standard-hours p {
        margin: 5px 0;
        font-size: 14px;
    }
    .open {
        color: green;
    }

    .closed {
        color: red;
    }

  
    .close-button {
        align-self: flex-end;
        background: none;
        border: none;
        font-size: 16px;
        cursor: pointer;
    }

    .park-description, .activities-list {
        margin-top: 10px;
        text-align: center;
    }

    .park-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-top: 10px;
    }

    .activities-list {
        list-style-type: none;
        padding: 0;
        width: 100%;
    }

    .activities-list li {
        padding: 5px;
        border-bottom: 1px solid #eee;
    }
    .participants-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1001; /* Above overlay */
  }

  .participant {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .participant-photo {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 10px;
  }

  </style>
  