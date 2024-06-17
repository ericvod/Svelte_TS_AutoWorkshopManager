<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  const { subscribe } = page;
  let id: number;
  subscribe(({ params }) => {
    id = Number(params.id);
  });

  let placa = '';
  let data_abertura = '';
  let data_fechamento = '';
  let status = '';
  let descricao_problema = '';
  let descricao_servico = '';
  let veiculo_modelo = '';

  const message = writable('');

  function navigateTo(path: string) {
    goto(path);
  }

  onMount(async () => {
    const response = await fetch(`/api/ordensdeservico/${id}`);
    if (response.ok) {
      const ordem = await response.json();
      placa = ordem.placa;
      data_abertura = ordem.data_abertura.split('T')[0];
      data_fechamento = ordem.data_fechamento ? ordem.data_fechamento.split('T')[0] : '';
      status = ordem.status;
      descricao_problema = ordem.descricao_problema;
      descricao_servico = ordem.descricao_servico;
      veiculo_modelo = ordem.veiculo.modelo;
    }
  });

  async function salvarOrdemDeServico() {
    const response = await fetch(`/api/ordensdeservico/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        placa,
        data_abertura: new Date(data_abertura).toISOString(),
        data_fechamento: data_fechamento ? new Date(data_fechamento).toISOString() : null,
        status,
        descricao_problema,
        descricao_servico
      })
    });

    if (response.ok) {
      message.set('Ordem de Serviço atualizada com sucesso!');
      setTimeout(() => {
        message.set('');
        navigateTo('/');
      }, 2000);
    } else {
      message.set('Erro ao atualizar a Ordem de Serviço.');
    }
  }
</script>

<style>
  .form-container {
    max-width: 500px;
    margin: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f9f9f9;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .form-group button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .form-group button:hover {
    background-color: #0056b3;
  }
  .message {
    margin-top: 1rem;
    text-align: center;
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
</style>

<div class="form-container">
  <nav class="nav">
    <button on:click={() => navigateTo('/')}>Home</button>
    <button on:click={() => navigateTo('/ordensdeservico')}>Voltar</button>
  </nav>
  <h2>Editar Ordem de Serviço</h2>
  <div class="form-group">
    <label for="placa">Placa:</label>
    <input type="text" id="placa" bind:value={placa} readonly />
  </div>
  <div class="form-group">
    <label for="veiculo_modelo">Modelo do Veículo:</label>
    <input type="text" id="veiculo_modelo" bind:value={veiculo_modelo} readonly />
  </div>
  <div class="form-group">
    <label for="data_abertura">Data de Abertura:</label>
    <input type="date" id="data_abertura" bind:value={data_abertura} />
  </div>
  <div class="form-group">
    <label for="data_fechamento">Data de Fechamento:</label>
    <input type="date" id="data_fechamento" bind:value={data_fechamento} />
  </div>
  <div class="form-group">
    <label for="status">Status:</label>
    <select id="status" bind:value={status}>
      <option value="Aberta">Aberta</option>
      <option value="Em Progresso">Em Progresso</option>
      <option value="Concluída">Concluída</option>
    </select>
  </div>
  <div class="form-group">
    <label for="descricao_problema">Descrição do Problema:</label>
    <textarea id="descricao_problema" bind:value={descricao_problema}></textarea>
  </div>
  <div class="form-group">
    <label for="descricao_servico">Descrição do Serviço:</label>
    <textarea id="descricao_servico" bind:value={descricao_servico}></textarea>
  </div>
  <div class="form-group">
    <button on:click={salvarOrdemDeServico}>Salvar Ordem de Serviço</button>
  </div>
  {#if $message}
    <div class="message">{$message}</div>
  {/if}
</div>
