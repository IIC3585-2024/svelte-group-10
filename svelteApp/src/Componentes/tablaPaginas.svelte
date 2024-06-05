<!-- Hecho con  ayuda de chatGPT. Advertencias de formato aparecen por extensión de vscode con svelte (tupescript), pero funciona bien -->
<script>
    import { onMount } from 'svelte';
    import { fetchArticles, articles, totalArticles, isLoading, errorMessage, itemsPerPage } from '../api';
  
    let currentPage = 1;
    let visiblePages = 5; 
  
    onMount(() => {
      fetchArticles(currentPage);
    });
  
    function setPage(page) {
      currentPage = page;
      fetchArticles(currentPage);
    }
  
    function totalPages() {
      return Math.ceil($totalArticles / itemsPerPage);
    }
  
    function pageRange() {
      let start = Math.max(currentPage - visiblePages, 1);
      let end = Math.min(currentPage + visiblePages, totalPages());
      let pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  </script>
  
  {#if $isLoading}
    <p>Loading articles...</p>
  {:else if $errorMessage}
    <p>{$errorMessage}</p>
  {:else if $articles.length > 0}
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Image</th>
          <th>Description</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {#each $articles as article}
          <tr>
            <td>{article.title}</td>
            <td><img src="{article.listingImage.url}" alt="{article.listingImage.altText}" style="width: 100px; height: auto;" /></td>
            <td>{article.listingDescription}</td>
            <td><a href="{article.url}">Read more</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="pagination">
      <button on:click={() => setPage(1)} disabled={currentPage === 1}>« First</button>
      <button on:click={() => setPage(currentPage - 1)} disabled={currentPage === 1}>‹ Prev</button>
      {#each pageRange() as page}
        <button on:click={() => setPage(page)} class:active={page === currentPage}>{page}</button>
      {/each}
      <button on:click={() => setPage(currentPage + 1)} disabled={currentPage === totalPages()}>Next ›</button>
      <button on:click={() => setPage(totalPages())} disabled={currentPage === totalPages()}>Last »</button>
    </div>
  {:else}
    <p>No articles available.</p>
  {/if}
  
  <style>
    table {
      margin-top: 50px;
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    img {
      width: 100px;
      height: auto;
    }
    button {
      padding: 5px 10px;
      margin-right: 4px;
      background-color: white;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    button.active {
      background-color: #007BFF;
      color: white;
      border-color: #0056b3;
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  </style>
  