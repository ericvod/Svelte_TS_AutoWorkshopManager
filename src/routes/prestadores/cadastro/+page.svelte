<script lang="ts">
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';

  let nome = '';
  let telefone = '';
  let email = '';
  let especialidade = '';

  const message = writable('');

  async function salvarPrestador() {
    const response = await fetch('/api/prestadores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        telefone,
        email,
        especialidade
      })
    });

    if (response.ok) {
      message.set('Prestador salvo com sucesso!');
      // Redirecionar ou limpar o formulário após o sucesso
      nome = '';
      telefone = '';
      email = '';
      especialidade = '';
      setTimeout(() => {
        message.set('');
        goto('/prestadores'); // Redireciona para a página de listagem
      }, 2000);
    } else {
      message.set('Erro ao salvar o prestador.');
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
</style>

<div class="form-container">
  <h2>Cadastro de Prestador de Serviço</h2>
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
    <label for="especialidade">Especialidade:</label>
    <input type="text" id="especialidade" bind:value={especialidade} placeholder="Digite a especialidade" />
  </div>
  <div class="form-group">
    <button on:click={salvarPrestador}>Salvar Prestador</button>
  </div>
  {#if $message}
    <div class="message">{$message}</div>
  {/if}
</div>
