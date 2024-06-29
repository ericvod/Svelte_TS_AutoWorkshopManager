<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { writable, type Writable } from 'svelte/store';

  type Cliente = {
    id: number;
    nome: string;
  };

  type Veiculo = {
    placa: string;
    chassi: string;
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
    cliente: Cliente;
  };

  const veiculos: Writable<Veiculo[]> = writable([]);

  onMount(async () => {
    const response = await fetch('/api/veiculos');
    if (response.ok) {
      const data: Veiculo[] = await response.json();
      veiculos.set(data);
    }
  });

  function navigateTo(path: string) {
    goto(path);
  }

  async function editarVeiculo(placa: string) {
    navigateTo(`/veiculos/editar/${placa}`);
  }

  async function excluirVeiculo(placa: string) {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      const response = await fetch(`/api/veiculos/${placa}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        veiculos.update(veiculos => veiculos.filter(veiculo => veiculo.placa !== placa));
      }
    }
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
  .button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .button:hover {
    background-color: #0056b3;
  }
  .proprietario {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background: #f9f9f9;
  }
  .veiculo {
    padding-left: 1rem;
    border-left: 3px solid #007bff;
    margin-bottom: 0.5rem;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
</style>

<div class="container">
  <nav class="nav">
    <button on:click={() => navigateTo('/')}>Home</button>
    <button on:click={() => navigateTo('/veiculos/cadastro')}>Cadastrar Novo Veículo</button>
  </nav>
  <h2>Lista de Veículos</h2>
  <div>
    {#each $veiculos as veiculo}
      <div class="proprietario">                                                                          
        <p><strong>Proprietário:</strong> {veiculo.cliente.nome}</p>
        <div class="veiculo">
          <p><strong>Placa:</strong> {veiculo.placa}</p>
          <p><strong>Chassi:</strong> {veiculo.chassi}</p>
          <p><strong>Marca:</strong> {veiculo.marca}</p>
          <p><strong>Modelo:</strong> {veiculo.modelo}</p>
          <p><strong>Ano:</strong> {veiculo.ano}</p>
          <p><strong>Cor:</strong> {veiculo.cor}</p>
          <div class="actions">
            <button class="button" on:click={() => editarVeiculo(veiculo.placa)}>Editar</button>
            <button class="button" on:click={() => excluirVeiculo(veiculo.placa)}>Excluir</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
