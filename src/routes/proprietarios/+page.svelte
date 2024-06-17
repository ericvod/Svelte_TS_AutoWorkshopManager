<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { writable, type Writable } from 'svelte/store';

  type Proprietario = {
    proprietario_id: number;
    nome: string;
    telefone: string;
    email: string;
    endereco: string;
  };

  const proprietarios: Writable<Proprietario[]> = writable([]);

  onMount(async () => {
    const response = await fetch('/api/proprietarios');
    if (response.ok) {
      const data: Proprietario[] = await response.json();
      proprietarios.set(data);
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
  .proprietario {
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
    <button on:click={() => navigateTo('/proprietarios/cadastro')}>Cadastrar Novo Proprietário</button>
  </nav>
  <h2>Lista de Proprietários</h2>
  <div>
    {#each $proprietarios as proprietario}
      <div class="proprietario">
        <p><strong>Nome:</strong> {proprietario.nome}</p>
        <p><strong>Telefone:</strong> {proprietario.telefone}</p>
        <p><strong>Email:</strong> {proprietario.email}</p>
        <p><strong>Endereço:</strong> {proprietario.endereco}</p>
      </div>
    {/each}
  </div>
</div>
