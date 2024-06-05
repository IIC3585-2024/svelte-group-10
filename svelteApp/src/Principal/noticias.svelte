<script>
  import { onMount } from 'svelte';
  import { fetchArticles } from '../api';
  import ArticleTable from '../Componentes/tablaPaginas.svelte';

  onMount(() => {
    fetchArticles();
  });
</script>

<ArticleTable />
