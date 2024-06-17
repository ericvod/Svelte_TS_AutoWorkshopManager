<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
  
    type OrdemDeServico = {
      os_id: number;
      placa: string;
    };
  
    type Prestador = {
      prestador_id: number;
      nome: string;
    };
  
    let os_id: number | null = null;
    let prestador_id: number | null = null;
    let data_inicio = '';
    let data_fim = '';
    let descricao_tarefa = '';
  
    const message = writable('');
    const ordensDeServico: Writable<OrdemDeServico[]> = writable([]);
    const prestadores: Writable<Prestador[]> = writable([]);
  
    onMount(async () => {
      const responseOrdens = await fetch('/api/ordensdeservico');
      if (responseOrdens.ok) {
        const dataOrdens: OrdemDeServico[] = await responseOrdens.json();
        ordensDeServico.set(dataOrdens);
      }
  
      const responsePrestadores = await fetch('/api/prestadores');
      if (responsePrestadores.ok) {
        const dataPrestadores: Prestador[] = await responsePrestadores.json();
        prestadores.set(dataPrestadores);
      }
    });
  
    async function salvarOrdemPrestador() {
      if (os_id === null || prestador_id === null) {
        message.set('Selecione uma ordem de serviço e um prestador.');
        return;
      }
  
      const response = await fetch('/api/ordensprestadores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          os_id,
          prestador_id,
          data_inicio: new Date(data_inicio).toISOString(),
          data_fim: data_fim ? new Date(data_fim).toISOString() : null,
          descricao_tarefa
        })
      });
  
      if (response.ok) {
        message.set('Ordem de Prestador salva com sucesso!');
        // Redirecionar ou limpar o formulário após o sucesso
        os_id = null;
        prestador_id = null;
        data_inicio = '';
        data_fim = '';
        descricao_tarefa = '';
        setTimeout(() => {
          message.set('');
          goto('/ordensprestadores'); // Redireciona para a página de listagem
        }, 2000);
      } else {
        message.set('Erro ao salvar a Ordem de Prestador.');
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
    <h2>Cadastro de Ordem de Prestador</h2>
    <div class="form-group">
      <label for="os_id">Ordem de Serviço:</label>
      <select id="os_id" bind:value={os_id}>
        <option value={null}>Selecione uma ordem de serviço</option>
        {#each $ordensDeServico as ordem}
          <option value={ordem.os_id}>OS #{ordem.os_id} - {ordem.placa}</option>
        {/each}
      </select>
    </div>
    <div class="form-group">
      <label for="prestador_id">Prestador:</label>
      <select id="prestador_id" bind:value={prestador_id}>
        <option value={null}>Selecione um prestador</option>
        {#each $prestadores as prestador}
          <option value={prestador.prestador_id}>{prestador.nome}</option>
        {/each}
      </select>
    </div>
    <div class="form-group">
      <label for="data_inicio">Data de Início:</label>
      <input type="date" id="data_inicio" bind:value={data_inicio} />
    </div>
    <div class="form-group">
      <label for="data_fim">Data de Fim:</label>
      <input type="date" id="data_fim" bind:value={data_fim} />
    </div>
    <div class="form-group">
      <label for="descricao_tarefa">Descrição da Tarefa:</label>
      <textarea id="descricao_tarefa" bind:value={descricao_tarefa}></textarea>
    </div>
    <div class="form-group">
      <button on:click={salvarOrdemPrestador}>Salvar Ordem de Prestador</button>
    </div>
    {#if $message}
      <div class="message">{$message}</div>
    {/if}
  </div>
  