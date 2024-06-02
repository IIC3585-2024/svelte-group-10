
<script>
    import { push, location } from 'svelte-spa-router'

    const paginas = [
      {'nombre': 'Inicio', 'ruta': '/'},                //0
      {'nombre': 'Noticias', 'ruta': '/noticias'},      //1
      {'nombre': 'Actividades', 'ruta': '/actividades'} //2
    ];
</script>

<main>
    <nav class="navbar navbar-expand-lg bg-body-tertiary justify-content-center">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {#each paginas as pag}
                <li class="nav-item">
                  <button class="nav-button { $location == pag.ruta ? 'active': ''}" on:click={()=>push(pag.ruta)}>{pag.nombre}</button>
                </li>
              {/each}
            </ul>

            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
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
</style>