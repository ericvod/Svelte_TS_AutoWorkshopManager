<script lang="ts">
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
  
    let estoque_id: number | '' = '';
    let data_compra = new Date().toISOString().split('T')[0];
    let quantidade: number | '' = '';
    let preco_total: number | '' = '';
  
    const message = writable('');
  
    function navigateTo(path: string) {
      goto(path);
    }
  
    async function salvarCompra() {
      const response = await fetch('/api/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estoque_id: Number(estoque_id),
          data_compra,
          quantidade: Number(quantidade),
          preco_total: Number(preco_total)
        })
      });
  
      if (response.ok) {
        message.set('Compra salva com sucesso!');
        estoque_id = '';
        data_compra = new Date().toISOString().split('T')[0];
        quantidade = '';
        preco_total = '';
        setTimeout(() => {
          message.set('');
          navigateTo('/compras');
        }, 2000);
      } else {
        message.set('Erro ao salvar a compra.');
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
      <button on:click={() => navigateTo('/compras')}>Voltar</button>
    </nav>
    <h2>Cadastro de Compra</h2>
    <div class="form-group">
      <label for="estoque_id">Estoque ID:</label>
      <input type="number" id="estoque_id" bind:value={estoque_id} placeholder="Digite o ID do estoque" />
    </div>
    <div class="form-group">
      <label for="data_compra">Data da Compra:</label>
      <input type="date" id="data_compra" bind:value={data_compra} />
    </div>
    <div class="form-group">
      <label for="quantidade">Quantidade:</label>
      <input type="number" id="quantidade" bind:value={quantidade} placeholder="Digite a quantidade" />
    </div>
    <div class="form-group">
      <label for="preco_total">Preço Total:</label>
      <input type="number" step="0.01" id="preco_total" bind:value={preco_total} placeholder="Digite o preço total" />
    </div>
    <div class="form-group">
      <button on:click={salvarCompra}>Salvar Compra</button>
    </div>
    {#if $message}
      <div class="message">{$message}</div>
    {/if}
  </div>
  