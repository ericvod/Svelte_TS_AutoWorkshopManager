<script lang="ts">
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
  
    let veiculo_placa = '';
    let data_abertura = new Date().toISOString().split('T')[0];
    let data_fechamento: string | null = null;
    let status = '';
    let descricao_problema = '';
    let descricao_servico = '';
  
    const message = writable('');
  
    function navigateTo(path: string) {
      goto(path);
    }
  
    async function salvarOrdemDeServico() {
      const response = await fetch('/api/ordensdeservico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          veiculo_placa,
          data_abertura,
          data_fechamento,
          status,
          descricao_problema,
          descricao_servico
        })
      });
  
      if (response.ok) {
        message.set('Ordem de Serviço salva com sucesso!');
        veiculo_placa = '';
        data_abertura = new Date().toISOString().split('T')[0];
        data_fechamento = null;
        status = '';
        descricao_problema = '';
        descricao_servico = '';
        setTimeout(() => {
          message.set('');
          navigateTo('/ordensdeservico');
        }, 2000);
      } else {
        message.set('Erro ao salvar a ordem de serviço.');
      }
    }
  </script>
  
  <style>
    .container {
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
    .form-group input,
    .form-group textarea {
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
  
  <div class="container">
    <nav class="nav">
      <button on:click={() => navigateTo('/')}>Home</button>
      <button on:click={() => navigateTo('/ordensdeservico')}>Voltar</button>
    </nav>
    <h2>Cadastro de Ordem de Serviço</h2>
    <div class="form-group">
      <label for="veiculo_placa">Veículo Placa:</label>
      <input type="text" id="veiculo_placa" bind:value={veiculo_placa} placeholder="Digite a placa do veículo" />
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
      <input type="text" id="status" bind:value={status} placeholder="Digite o status" />
    </div>
    <div class="form-group">
      <label for="descricao_problema">Descrição do Problema:</label>
      <textarea id="descricao_problema" bind:value={descricao_problema} placeholder="Digite a descrição do problema"></textarea>
    </div>
    <div class="form-group">
      <label for="descricao_servico">Descrição do Serviço:</label>
      <textarea id="descricao_servico" bind:value={descricao_servico} placeholder="Digite a descrição do serviço"></textarea>
    </div>
    <div class="form-group">
      <button on:click={salvarOrdemDeServico}>Salvar Ordem de Serviço</button>
    </div>
    {#if $message}
      <div class="message">{$message}</div>
    {/if}
  </div>
  