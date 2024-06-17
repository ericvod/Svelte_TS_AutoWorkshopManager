<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';

  type Veiculo = {
    placa: string;
    modelo: string;
  };

  let placa = '';
  let data_abertura = '';
  let data_fechamento = '';
  let status = '';
  let descricao_problema = '';
  let descricao_servico = '';

  const message = writable('');
  const veiculos: Writable<Veiculo[]> = writable([]);

  onMount(async () => {
    const response = await fetch('/api/veiculos');
    if (response.ok) {
      const data: Veiculo[] = await response.json();
      veiculos.set(data);
    }
  });

  async function salvarOrdemDeServico() {
    const response = await fetch('/api/ordensdeservico', {
      method: 'POST',
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
      message.set('Ordem de Serviço salva com sucesso!');
      // Redirecionar ou limpar o formulário após o sucesso
      placa = '';
      data_abertura = '';
      data_fechamento = '';
      status = '';
      descricao_problema = '';
      descricao_servico = '';
      setTimeout(() => {
        message.set('');
        goto('/ordensdeservico'); // Redireciona para a página de listagem
      }, 2000);
    } else {
      message.set('Erro ao salvar a Ordem de Serviço.');
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
</style>

<div class="form-container">
  <h2>Cadastro de Ordem de Serviço</h2>
  <div class="form-group">
    <label for="placa">Veículo (Placa):</label>
    <select id="placa" bind:value={placa}>
      <option value="">Selecione um veículo</option>
      {#each $veiculos as veiculo}
        <option value={veiculo.placa}>{veiculo.placa} - {veiculo.modelo}</option>
      {/each}
    </select>
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
      <option value="">Selecione um status</option>
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
