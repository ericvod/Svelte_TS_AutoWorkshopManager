<script lang="ts">
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
  
    let nome = '';
    let descricao = '';
    let quantidade: number | '' = '';
    let preco: number | '' = '';
  
    const message = writable('');
  
    function navigateTo(path: string) {
      goto(path);
    }
  
    async function salvarItemEstoque() {
      const response = await fetch('/api/estoque', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          descricao,
          quantidade: Number(quantidade),
          preco: Number(preco)
        })
      });
  
      if (response.ok) {
        message.set('Item de Estoque salvo com sucesso!');
        nome = '';
        descricao = '';
        quantidade = '';
        preco = '';
        setTimeout(() => {
          message.set('');
          navigateTo('/estoque');
        }, 2000);
      } else {
        message.set('Erro ao salvar o item de estoque.');
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
      <button on:click={() => navigateTo('/estoque')}>Voltar</button>
    </nav>
    <h2>Cadastro de Item no Estoque</h2>
    <div class="form-group">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" bind:value={nome} placeholder="Digite o nome do item" />
    </div>
    <div class="form-group">
      <label for="descricao">Descrição:</label>
      <input type="text" id="descricao" bind:value={descricao} placeholder="Digite a descrição" />
    </div>
    <div class="form-group">
      <label for="quantidade">Quantidade:</label>
      <input type="number" id="quantidade" bind:value={quantidade} placeholder="Digite a quantidade" />
    </div>
    <div class="form-group">
      <label for="preco">Preço:</label>
      <input type="number" step="0.01" id="preco" bind:value={preco} placeholder="Digite o preço" />
    </div>
    <div class="form-group">
      <button on:click={salvarItemEstoque}>Salvar Item</button>
    </div>
    {#if $message}
      <div class="message">{$message}</div>
    {/if}
  </div>
  