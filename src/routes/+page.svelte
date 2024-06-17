<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { writable, type Writable } from 'svelte/store';

  type OrdemDeServico = {
    os_id: number;
    placa: string;
    data_abertura: string;
    data_fechamento: string | null;
    status: string;
    descricao_problema: string;
    descricao_servico: string;
    veiculo: {
      modelo: string;
    };
  };

  const ordensDeServico: Writable<OrdemDeServico[]> = writable([]);

  onMount(async () => {
    const response = await fetch('/api/ordensdeservico');
    if (response.ok) {
      const data: OrdemDeServico[] = await response.json();
      ordensDeServico.set(data);
    }
  });

  function navigateTo(path: string) {
    goto(path);
  }

  function editOrdemDeServico(os_id: number) {
    goto(`/ordensdeservico/editar/${os_id}`);
  }
</script>

<style>
  .container {
    max-width: 1000px;
    margin: auto;
    padding: 1rem;
  }
  .nav {
    display: flex;
    justify-content: space-around;
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
  .header {
    text-align: center;
    margin-bottom: 2rem;
  }
  .ordemdeservico {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background: #f9f9f9;
  }
  .edit-button {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0.5rem 1rem;
    text-align: center;
    margin-top: 1rem;
  }
  .edit-button:hover {
    background-color: #218838;
  }
</style>

<div class="container">
  <nav class="nav">
    <button on:click={() => navigateTo('/')}>Home</button>
    <button on:click={() => navigateTo('/proprietarios')}>Gerenciar Proprietários</button>
    <button on:click={() => navigateTo('/veiculos')}>Gerenciar Veículos</button>
    <button on:click={() => navigateTo('/prestadores')}>Gerenciar Prestadores</button>
    <button on:click={() => navigateTo('/ordensdeservico')}>Gerenciar Ordens de Serviço</button>
    <button on:click={() => navigateTo('/ordensprestadores')}>Gerenciar Ordens de Prestadores</button>
  </nav>
  
  <div class="header">
    <h1>Administração de Oficina</h1>
    <p>Bem-vindo ao sistema de administração da oficina. Escolha uma das opções abaixo para gerenciar os dados.</p>
  </div>
  
  <h2>Lista de Ordens de Serviço</h2>
  <div>
    {#each $ordensDeServico as ordem}
      <div class="ordemdeservico">
        <p><strong>Veículo:</strong> {ordem.placa} - {ordem.veiculo.modelo}</p>
        <p><strong>Data de Abertura:</strong> {new Date(ordem.data_abertura).toLocaleDateString()}</p>
        {#if ordem.data_fechamento}
          <p><strong>Data de Fechamento:</strong> {new Date(ordem.data_fechamento).toLocaleDateString()}</p>
        {/if}
        <p><strong>Status:</strong> {ordem.status}</p>
        <p><strong>Descrição do Problema:</strong> {ordem.descricao_problema}</p>
        <p><strong>Descrição do Serviço:</strong> {ordem.descricao_servico}</p>
        <button class="edit-button" type="button" on:click={() => editOrdemDeServico(ordem.os_id)}>Editar</button>
      </div>
    {/each}
  </div>
</div>
