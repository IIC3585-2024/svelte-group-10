<script>
    import { push, link } from "svelte-spa-router";
</script>

<h1>Inicio</h1>

<a href="/noticias" use:link>Soy un boton a las noticias</a>
<button on:click={()=> push('/noticias')}> Soy un real boton </button>