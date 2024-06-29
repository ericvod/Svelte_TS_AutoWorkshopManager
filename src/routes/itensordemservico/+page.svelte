<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
  
    type ItensOrdemServico = {
      id: number;
      ordem_servico_id: number;
      servico_id: number;
      preco_total: number;
    };
  
    const itensOrdemServico: Writable<ItensOrdemServico[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/itensordemservico');
      if (response.ok) {
        const data: ItensOrdemServico[] = await response.json();
        itensOrdemServico.set(data);
      }
    });
  
    function navigateTo(path: string) {
      goto(path);
    }
  </script>
  
  <style>
    .container {
      max-width: 800px;
      margin: auto;
      padding: 1rem;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background-color: #007bff;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    .nav button {
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      background-color: #0056b3;
      border: none;
      cursor: pointer;
    }
    .nav button:hover {
      background-color: #004494;
    }
    .itemOrdemServico {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: #f9f9f9;
    }
  </style>
  
  <div class="container">
    <nav class="nav">
      <button on:click={() => navigateTo('/')}>Home</button>
      <button on:click={() => navigateTo('/itensordemservico/cadastro')}>Cadastrar Novo Item</button>
    </nav>
    <h2>Lista de Itens da Ordem de Serviço</h2>
    <div>
      {#each $itensOrdemServico as item}
        <div class="itemOrdemServico">
          <p><strong>Ordem de Serviço ID:</strong> {item.ordem_servico_id}</p>
          <p><strong>Serviço ID:</strong> {item.servico_id}</p>
          <p><strong>Preço Total:</strong> {item.preco_total}</p>
        </div>
      {/each}
    </div>
  </div>
  