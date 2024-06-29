<script lang="ts">
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
  
    let ordem_servico_id: number | '' = '';
    let funcionario_id: number | '' = '';
  
    const message = writable('');
  
    function navigateTo(path: string) {
      goto(path);
    }
  
    async function salvarAssociacao() {
      const response = await fetch('/api/ordemservicofuncionario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ordem_servico_id: Number(ordem_servico_id),
          funcionario_id: Number(funcionario_id)
        })
      });
  
      if (response.ok) {
        message.set('Associação salva com sucesso!');
        ordem_servico_id = '';
        funcionario_id = '';
        setTimeout(() => {
          message.set('');
          navigateTo('/ordemservicofuncionario');
        }, 2000);
      } else {
        message.set('Erro ao salvar a associação.');
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
    .form-group input {
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
      <button on:click={() => navigateTo('/ordemservicofuncionario')}>Voltar</button>
    </nav>
    <h2>Cadastro de Associação entre Ordem de Serviço e Funcionário</h2>
    <div class="form-group">
      <label for="ordem_servico_id">Ordem de Serviço ID:</label>
      <input type="number" id="ordem_servico_id" bind:value={ordem_servico_id} placeholder="Digite o ID da ordem de serviço" />
    </div>
    <div class="form-group">
      <label for="funcionario_id">Funcionário ID:</label>
      <input type="number" id="funcionario_id" bind:value={funcionario_id} placeholder="Digite o ID do funcionário" />
    </div>
    <div class="form-group">
      <button on:click={salvarAssociacao}>Salvar Associação</button>
    </div>
    {#if $message}
      <div class="message">{$message}</div>
    {/if}
  </div>
  