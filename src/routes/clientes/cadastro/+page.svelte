<script lang="ts">
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
  
    let nome = '';
    let cpf = '';
    let telefone = '';
    let email = '';
    let endereco = '';
  
    const message = writable('');
  
    function navigateTo(path: string) {
      goto(path);
    }
  
    async function salvarCliente() {
      const response = await fetch('/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          cpf,
          telefone,
          email,
          endereco
        })
      });
  
      if (response.ok) {
        message.set('Cliente salvo com sucesso!');
        nome = '';
        cpf = '';
        telefone = '';
        email = '';
        endereco = '';
        setTimeout(() => {
          message.set('');
          navigateTo('/clientes');
        }, 2000);
      } else {
        message.set('Erro ao salvar o cliente.');
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
      <button on:click={() => navigateTo('/clientes')}>Voltar</button>
    </nav>
    <h2>Cadastro de Cliente</h2>
    <div class="form-group">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" bind:value={nome} placeholder="Digite o nome" />
    </div>
    <div class="form-group">
      <label for="cpf">CPF:</label>
      <input type="text" id="cpf" bind:value={cpf} placeholder="Digite o CPF" />
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
      <label for="endereco">Endereço:</label>
      <input type="text" id="endereco" bind:value={endereco} placeholder="Digite o endereço" />
    </div>
    <div class="form-group">
      <button on:click={salvarCliente}>Salvar Cliente</button>
    </div>
    {#if $message}
      <div class="message">{$message}</div>
    {/if}
  </div>
  