<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
  
    type Compra = {
      id: number;
      estoque_id: number;
      data_compra: string;
      quantidade: number;
      preco_total: number;
    };
  
    const compras: Writable<Compra[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/compras');
      if (response.ok) {
        const data: Compra[] = await response.json();
        compras.set(data);
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
    .compra {
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
      <button on:click={() => navigateTo('/compras/cadastro')}>Cadastrar Nova Compra</button>
    </nav>
    <h2>Lista de Compras</h2>
    <div>
      {#each $compras as compra}
        <div class="compra">
          <p><strong>Estoque ID:</strong> {compra.estoque_id}</p>
          <p><strong>Data da Compra:</strong> {new Date(compra.data_compra).toLocaleDateString()}</p>
          <p><strong>Quantidade:</strong> {compra.quantidade}</p>
          <p><strong>Preço Total:</strong> {compra.preco_total}</p>
        </div>
      {/each}
    </div>
  </div>
  