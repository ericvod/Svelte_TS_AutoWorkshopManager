<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
  
    type Estoque = {
      id: number;
      nome: string;
      descricao: string;
      quantidade: number;
      preco: number;
    };
  
    const estoque: Writable<Estoque[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/estoque');
      if (response.ok) {
        const data: Estoque[] = await response.json();
        estoque.set(data);
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
    .itemEstoque {
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
      <button on:click={() => navigateTo('/estoque/cadastro')}>Cadastrar Novo Item</button>
    </nav>
    <h2>Lista de Itens no Estoque</h2>
    <div>
      {#each $estoque as item}
        <div class="itemEstoque">
          <p><strong>Nome:</strong> {item.nome}</p>
          <p><strong>Descrição:</strong> {item.descricao}</p>
          <p><strong>Quantidade:</strong> {item.quantidade}</p>
          <p><strong>Preço:</strong> {item.preco}</p>
        </div>
      {/each}
    </div>
  </div>
  