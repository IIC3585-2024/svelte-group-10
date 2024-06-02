<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import Navbar from "./Componentes/navbar.svelte";

</script>

<main>
  <Navbar />
  <Router {routes} />
   
</main>