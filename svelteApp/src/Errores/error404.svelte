<script>
    import { push } from "svelte-spa-router";
</script>

<h1>Error 404</h1>
<p>La página buscada no existe. Vuelva a una página existene o a inicio</p>


<button on:click={()=> push('/')}> Volver a Inicio </button>