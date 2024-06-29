<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
  
    type OrdemServicoFuncionario = {
      id: number;
      ordem_servico_id: number;
      funcionario_id: number;
    };
  
    const ordemServicoFuncionario: Writable<OrdemServicoFuncionario[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/ordemservicofuncionario');
      if (response.ok) {
        const data: OrdemServicoFuncionario[] = await response.json();
        ordemServicoFuncionario.set(data);
      }
    });
  
    function navigateTo(path: string) {
      goto(path);
    }
  </script>
  
  <style>
    .container {
      max-width: 800px;
      margin: auto;
      padding: 1rem;
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
    .associacao {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: #f9f9f9;
    }
  </style>
  
  <div class="container">
    <nav class="nav">
      <button on:click={() => navigateTo('/')}>Home</button>
      <button on:click={() => navigateTo('/ordemservicofuncionario/cadastro')}>Cadastrar Nova Associação</button>
    </nav>
    <h2>Lista de Associações entre Ordens de Serviço e Funcionários</h2>
    <div>
      {#each $ordemServicoFuncionario as associacao}
        <div class="associacao">
          <p><strong>Ordem de Serviço ID:</strong> {associacao.ordem_servico_id}</p>
          <p><strong>Funcionário ID:</strong> {associacao.funcionario_id}</p>
        </div>
      {/each}
    </div>
  </div>
  