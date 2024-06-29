<script lang="ts">
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
  
    let nome = '';
    let telefone = '';
    let email = '';
    let cargo = '';
  
    const message = writable('');
  
    function navigateTo(path: string) {
      goto(path);
    }
  
    async function salvarFuncionario() {
      const response = await fetch('/api/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          telefone,
          email,
          cargo
        })
      });
  
      if (response.ok) {
        message.set('Funcionário salvo com sucesso!');
        nome = '';
        telefone = '';
        email = '';
        cargo = '';
        setTimeout(() => {
          message.set('');
          navigateTo('/funcionarios');
        }, 2000);
      } else {
        message.set('Erro ao salvar o funcionário.');
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
      <button on:click={() => navigateTo('/funcionarios')}>Voltar</button>
    </nav>
    <h2>Cadastro de Funcionário</h2>
    <div class="form-group">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" bind:value={nome} placeholder="Digite o nome" />
    </div>
    <div class="form-group">
      <label for="telefone">Telefone:</label>
      <input type="text" id="telefone" bind:value={telefone} placeholder="Digite o telefone" />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} placeholder="Digite o email" />
    </div>
    <div class="form-group">
      <label for="cargo">Cargo:</label>
      <input type="text" id="cargo" bind:value={cargo} placeholder="Digite o cargo" />
    </div>
    <div class="form-group">
      <button on:click={salvarFuncionario}>Salvar Funcionário</button>
    </div>
    {#if $message}
      <div class="message">{$message}</div>
    {/if}
  </div>
  