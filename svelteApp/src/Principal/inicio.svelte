<script>
    import { push, link } from "svelte-spa-router";
    import { isLoggedIn, user } from "../stores";
    import Carousel from '../Componentes/carrusel.svelte';
  </script>
  
  <main>
    <div class="welcome-message">
      <h1>Bienvenido a nuestra plataforma de actividades</h1>
      <p>Descubre una amplia gama de actividades al aire libre, culturales, y más para disfrutar al máximo tu tiempo libre.</p>
      <button on:click={() => push('/actividades')}>Explora nuestras actividades</button>
    </div>
    <Carousel images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]} />
  </main>
  
  <style>
    .welcome-message {
      text-align: center;
      padding: 20px;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      margin: 20px auto;
      max-width: 800px;
    }
  
    .welcome-message h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
  
    .welcome-message p {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
  
    .welcome-message button {
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .welcome-message button:hover {
      background-color: #0056b3;
    }
  </style>
  