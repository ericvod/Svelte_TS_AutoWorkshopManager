<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
  
    type Servico = {
      id: number;
      nome: string;
      descricao: string;
      preco: number;
    };
  
    const servicos: Writable<Servico[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/servicos');
      if (response.ok) {
        const data: Servico[] = await response.json();
        servicos.set(data);
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
    .servico {
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
      <button on:click={() => navigateTo('/servicos/cadastro')}>Cadastrar Novo Serviço</button>
    </nav>
    <h2>Lista de Serviços</h2>
    <div>
      {#each $servicos as servico}
        <div class="servico">
          <p><strong>Nome:</strong> {servico.nome}</p>
          <p><strong>Descrição:</strong> {servico.descricao}</p>
          <p><strong>Preço:</strong> {servico.preco}</p>
        </div>
      {/each}
    </div>
  </div>
  