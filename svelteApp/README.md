# App outdoor
Incluye actividades al aire libre como de patrimonio (museos, exposiciones, etc). Se sacó la información desde la api `https://www.nps.gov/subjects/developer/index.htm`

El link de la página es: [https://svelteapp-b2a9f.web.app/]

Es importante crear una api key en caso de querer probarlo en local. Para ello crear una llave desde la api, y crear un `.env` con el siguiente formato: 

```js
VITE_API_KEY='AQUÍ VA LA API KEY'
```

Para instalar dependencias usar:
```
npm i
```

Para ejecutar en localhost usar:
```
npm run dev
```

Se usaron servicios aprendidos anteriormente como la autentificación y uso de bases de datos de firebase.