
<script>
  import { push, location } from 'svelte-spa-router'
  import { user, isLoggedIn, filteredParks } from '../stores'; 
  import {parks} from '../api';
  import { auth } from "../firebase";
  import { signOut, onAuthStateChanged } from "firebase/auth";

  let searchText = ''; 
  const paginas = [
    {'nombre': 'Inicio', 'ruta': '/'},                 //0
    {'nombre': 'Noticias', 'ruta': '/noticias'},       //1
    {'nombre': 'Actividades', 'ruta': '/actividades'}, //2
    
  ];
  const logout = async () => {
  try {
    await signOut(auth);
    $user = {};
    $isLoggedIn = false;
    push("/");
  } catch (error) {
    console.error(error);
  }};

  onAuthStateChanged(auth, (authUser) => {
    $user = authUser;
    $isLoggedIn = !!authUser;
  });

  function updateFilter() {
    if (searchText.trim() === '') {
      filteredParks.set($parks);
    } else {
      const filtered = $parks.filter(park => park.fullName.toLowerCase().includes(searchText.toLowerCase()));
      filteredParks.set(filtered);
    }
  }
    
</script>

<main>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {#if $isLoggedIn}
              {#each paginas as pag}
                <li class="nav-item">
                  <button class="nav-button { $location == pag.ruta ? 'active': ''}" on:click={()=>push(pag.ruta)}>{pag.nombre}</button>
                </li>
              {/each}
            {/if}
          </ul>
          {#if $isLoggedIn}
          <button class="nav-button logout-button" on:click={logout}>Logout</button>
            {#if $location === '/actividades'}
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Buscar parque..." bind:value={searchText} on:input={updateFilter}>
            </form>
            {/if}
          {:else}
            <button class="nav-button login-button" on:click={() => push('/login')}>Login</button>
          {/if}
        </div>
      </div>
    </nav>
</main>


<style>
  .navbar {
      background-color: #f5f5f5; /* Color de fondo */
      padding: 0.5rem 1rem;
  }
  .nav-button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      transition: border-color 0.25s;
      margin-left: 5px;
      margin-right: 5px;
  }
  .nav-button:hover {
      background-color: #dee2e6;

  }
  .nav-button.active {
      background-color: rgb(43, 193, 43);
      color: white;
  }

  .logout-button:hover {
    background-color: rgb(220, 53, 69);
    color: white;
  }
  .login-button:hover {
    background-color: rgb(43, 193, 43);
    color: white;
  }
</style>