<script lang="ts">
  import { goto } from '$app/navigation';
  import { writable, type Writable } from 'svelte/store';
  import { onMount } from 'svelte';

  let placa = '';
  let chassi = '';
  let marca = '';
  let modelo = '';
  let ano: number | '' = '';
  let cor = '';
  let clienteId: number | null = null;
  const clientes: Writable<{ id: number; nome: string }[]> = writable([]);
  const filteredClientes: Writable<{ id: number; nome: string }[]> = writable([]);
  const message = writable('');

  onMount(async () => {
    const response = await fetch('/api/clientes');
    if (response.ok) {
      const data: { id: number; nome: string }[] = await response.json();
      clientes.set(data);
      filteredClientes.set(data);
    }
  });

  function navigateTo(path: string) {
    goto(path);
  }

  function filterClientes(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.toLowerCase();
    clientes.subscribe((clientesList) => {
      const filtered = clientesList.filter(cliente =>
        cliente.nome.toLowerCase().includes(query)
      );
      filteredClientes.set(filtered);
    });
  }

  async function salvarVeiculo() {
    const response = await fetch('/api/veiculos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        placa,
        chassi,
        marca,
        modelo,
        ano: Number(ano),
        cor,
        clienteId
      })
    });

    if (response.ok) {
      message.set('Veículo salvo com sucesso!');
      placa = '';
      chassi = '';
      marca = '';
      modelo = '';
      ano = '';
      cor = '';
      clienteId = null;
      setTimeout(() => {
        message.set('');
        navigateTo('/veiculos');
      }, 2000);
    } else {
      message.set('Erro ao salvar o veículo.');
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
  .form-group input, .form-group select {
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
    <button on:click={() => navigateTo('/veiculos')}>Voltar</button>
  </nav>
  <h2>Cadastro de Veículo</h2>
  <div class="form-group">
    <label for="placa">Placa:</label>
    <input type="text" id="placa" bind:value={placa} placeholder="Digite a placa" />
  </div>
  <div class="form-group">
    <label for="chassi">Chassi:</label>
    <input type="text" id="chassi" bind:value={chassi} placeholder="Digite o chassi" />
  </div>
  <div class="form-group">
    <label for="marca">Marca:</label>
    <input type="text" id="marca" bind:value={marca} placeholder="Digite a marca" />
  </div>
  <div class="form-group">
    <label for="modelo">Modelo:</label>
    <input type="text" id="modelo" bind:value={modelo} placeholder="Digite o modelo" />
  </div>
  <div class="form-group">
    <label for="ano">Ano:</label>
    <input type="number" id="ano" bind:value={ano} placeholder="Digite o ano" />
  </div>
  <div class="form-group">
    <label for="cor">Cor:</label>
    <input type="text" id="cor" bind:value={cor} placeholder="Digite a cor" />
  </div>
  <div class="form-group">
    <label for="cliente">Cliente:</label>
    <input type="text" id="cliente" placeholder="Digite o nome do cliente" on:input={filterClientes} />
    <select bind:value={clienteId}>
      {#each $filteredClientes as cliente}
        <option value={cliente.id}>{cliente.nome}</option>
      {/each}
    </select>
  </div>
  <div class="form-group">
    <button on:click={salvarVeiculo}>Salvar Veículo</button>
  </div>
  {#if $message}
    <div class="message">{$message}</div>
  {/if}
</div>
