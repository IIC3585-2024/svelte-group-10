import Inicio from "./Principal/inicio.svelte";
import Noticias from "./Principal/noticias.svelte";
import Error404 from "./Errores/error404.svelte";
import Actividades from "./Principal/actividades.svelte";
import Login from "./Principal/login.svelte";

const routes = {
    '/':Inicio,
    '/noticias': Noticias,
    '/actividades': Actividades,
    '/login': Login,

    '*': Error404


}

export default routes;