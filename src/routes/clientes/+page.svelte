<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
    import Sidebar from '../../components/Sidebar.svelte'
  
    type Cliente = {
      id: number;
      nome: string;
      cpf: string;
      telefone: string;
      email: string;
      endereco: string;
    };
  
    const clientes: Writable<Cliente[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/clientes');
      if (response.ok) {
        const data: Cliente[] = await response.json();
        clientes.set(data);
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
    .cliente {
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
      <button on:click={() => navigateTo('/clientes/cadastro')}>Cadastrar Novo Cliente</button>
    </nav>
    <h2>Lista de Clientes</h2>
    <div>
      {#each $clientes as cliente}
        <div class="cliente">
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>CPF:</strong> {cliente.cpf}</p>
          <p><strong>Telefone:</strong> {cliente.telefone}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
          <p><strong>Endereço:</strong> {cliente.endereco}</p>
        </div>
      {/each}
    </div>
  </div>
  