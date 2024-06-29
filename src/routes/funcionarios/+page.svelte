<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
  
    type Funcionario = {
      id: number;
      nome: string;
      telefone: string;
      email: string;
      cargo: string;
    };
  
    const funcionarios: Writable<Funcionario[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/funcionarios');
      if (response.ok) {
        const data: Funcionario[] = await response.json();
        funcionarios.set(data);
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
    .funcionario {
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
      <button on:click={() => navigateTo('/funcionarios/cadastro')}>Cadastrar Novo Funcionário</button>
    </nav>
    <h2>Lista de Funcionários</h2>
    <div>
      {#each $funcionarios as funcionario}
        <div class="funcionario">
          <p><strong>Nome:</strong> {funcionario.nome}</p>
          <p><strong>Telefone:</strong> {funcionario.telefone}</p>
          <p><strong>Email:</strong> {funcionario.email}</p>
          <p><strong>Cargo:</strong> {funcionario.cargo}</p>
        </div>
      {/each}
    </div>
  </div>
  