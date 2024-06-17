<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";

  type Proprietario = {
    proprietario_id: number;
    nome: string;
  };

  let placa = "";
  let chassi = "";
  let marca = "";
  let modelo = "";
  let ano: number | null = null;
  let cor = "";
  let proprietario_id: number | null = null;

  const message = writable("");
  const proprietarios: Writable<Proprietario[]> = writable([]);

  onMount(async () => {
    const response = await fetch("/api/proprietarios");
    if (response.ok) {
      const data: Proprietario[] = await response.json();
      proprietarios.set(data);
    }
  });

  async function salvarVeiculo() {
    if (proprietario_id === null) {
      message.set("Selecione um proprietário.");
      return;
    }

    const response = await fetch("/api/veiculos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        placa,
        chassi,
        marca,
        modelo,
        ano,
        cor,
        proprietario_id,
      }),
    });

    if (response.ok) {
      message.set("Veículo salvo com sucesso!");
      placa = "";
      chassi = "";
      marca = "";
      modelo = "";
      ano = null;
      cor = "";
      proprietario_id = null;
      setTimeout(() => {
        message.set("");
        goto("/veiculos");
      }, 2000);
    } else {
      message.set("Erro ao salvar o veículo.");
    }
  }

  function navigateTo(path: string) {
    goto(path);
  }
</script>

<div class="container">
  <nav class="nav">
    <button on:click={() => navigateTo("/")}>Home</button>
    <button on:click={() => navigateTo("/veiculos")}>Voltar</button>
  </nav>
  <h2>Cadastro de Veículo</h2>
  <div class="form-group">
    <label for="placa">Placa:</label>
    <input
      type="text"
      id="placa"
      bind:value={placa}
      placeholder="Digite a placa"
    />
  </div>
  <div class="form-group">
    <label for="chassi">Chassi:</label>
    <input
      type="text"
      id="chassi"
      bind:value={chassi}
      placeholder="Digite o chassi"
    />
  </div>
  <div class="form-group">
    <label for="marca">Marca:</label>
    <input
      type="text"
      id="marca"
      bind:value={marca}
      placeholder="Digite a marca"
    />
  </div>
  <div class="form-group">
    <label for="modelo">Modelo:</label>
    <input
      type="text"
      id="modelo"
      bind:value={modelo}
      placeholder="Digite o modelo"
    />
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
    <label for="proprietario_id">Proprietário:</label>
    <select id="proprietario_id" bind:value={proprietario_id}>
      <option value="">Selecione um proprietário</option>
      {#each $proprietarios as proprietario}
        <option value={proprietario.proprietario_id}>{proprietario.nome}</option
        >
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
  .form-group select {
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
