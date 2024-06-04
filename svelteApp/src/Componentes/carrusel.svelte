<script>
    import { onMount, onDestroy } from 'svelte';
  
    export let images = [];
    let currentSlideIndex = 0;
    let intervalId;
  
    function startCarousel() {
      intervalId = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  
    function nextSlide() {
      const carouselItems = document.querySelectorAll('.carousel-item');
      carouselItems[currentSlideIndex].classList.remove('active');
      currentSlideIndex = (currentSlideIndex + 1) % images.length;
      carouselItems[currentSlideIndex].classList.add('active');
    }
  
    onMount(() => {
      startCarousel();
    });
  
    onDestroy(() => {
      clearInterval(intervalId);
    });
  </script>
  
  <main>
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" >
      <div class="carousel-inner">
        {#each images as image, i}
          <div class="carousel-item {i === 0 ? 'active' : ''}">
            <img src={image} class="d-block w-100 h-screen" alt="...">
          </div>
        {/each}
      </div>
    </div>
  </main>
  
  <style>
    #carouselExampleAutoplaying {
      position: fixed;
      top: 50px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }
  
    .carousel-item img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  </style>
  