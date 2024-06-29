<script lang="ts">
  import { goto } from '$app/navigation';

  function navigateTo(path: string) {
    goto(path);
  }
</script>

<style>
  .container {
    max-width: 1000px;
    margin: auto;
    padding: 1rem;
  }
  .nav {
    display: flex;
    justify-content: space-around;
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
  .header {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>

<div class="container">
  <nav class="nav">
    <button on:click={() => navigateTo('/')}>Home</button>
    <button on:click={() => navigateTo('/clientes')}>Gerenciar Clientes</button>
    <button on:click={() => navigateTo('/veiculos')}>Gerenciar Veículos</button>
    <button on:click={() => navigateTo('/funcionarios')}>Gerenciar Funcionários</button>
    <button on:click={() => navigateTo('/ordensdeservico')}>Gerenciar Ordens de Serviço</button>
    <button on:click={() => navigateTo('/estoque')}>Gerenciar Estoque</button>
    <button on:click={() => navigateTo('/compras')}>Gerenciar Compras</button>
    <button on:click={() => navigateTo('/ordemservicofuncionario')}>Gerenciar Ordens de Prestadores</button>
  </nav>

  <div class="header">
    <h1>Administração de Oficina</h1>
    <p>Bem-vindo ao sistema de administração da oficina. Escolha uma das opções abaixo para gerenciar os dados.</p>
  </div>
</div>
