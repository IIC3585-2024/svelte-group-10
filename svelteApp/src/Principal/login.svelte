<!-- logi basado en https://www.youtube.com/watch?v=B6quDView8Y -->

<script>
    import { auth } from "../firebase";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { user, isLoggedIn } from "../stores";
    import { push } from 'svelte-spa-router';
  
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
  
  <h2>Para usar la página ingrese un usuario por favor</h2>
  <button on:click={login}>
    Google Login
  </button>