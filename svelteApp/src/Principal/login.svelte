<!-- login basado en https://www.youtube.com/watch?v=B6quDView8Y -->
<!-- estilos hecho con ayuda de chatgpt -->

<script>
    import { auth } from "../firebase";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { user, isLoggedIn } from "../stores";
    import { push } from 'svelte-spa-router';
    import Carousel from '../Componentes/carrusel.svelte';
  
    const login = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        $user = res.user;
        $isLoggedIn = true;
        console.log($user);
        push("/");
      } catch (error) {
        console.error(error);
      }
    };
  </script>
  
<main>
  <Carousel images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]} />

  <div class="welcome-message">
    <h2>Para usar la página, ingrese un usuario por favor</h2>
    <button on:click={login}>Google Login</button>
  </div>
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

  .welcome-message h2 {
    font-size: 2.5rem;
    margin-bottom: 10px;
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
