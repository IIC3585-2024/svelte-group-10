<script>
    import { push, link } from "svelte-spa-router";
    import { isLoggedIn, user } from "../stores";
</script>

<h1>Inicio</h1>

<!-- <a href="/noticias" use:link>Soy un boton a las noticias</a>
<button on:click={()=> push('/noticias')}> Soy un real boton </button> -->

<!-- Aparece como error, pero es un error de typescript por la extensión de svelte (por lo que si funciona) -->
<main>

    {#if $isLoggedIn}
        <img
        src={$user.photoURL} alt={$user.displayName} class="w-40 h-40 rounded-full m-auto"/>
        <h3>{$user.displayName}</h3>
        <p>{$user.email}</p>
    {/if}
</main>