<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
  
    type OrdemPrestador = {
      os_id: number;
      prestador_id: number;
      data_inicio: string;
      data_fim: string | null;
      descricao_tarefa: string;
      ordemDeServico: {
        placa: string;
      };
      prestador: {
        nome: string;
      };
    };
  
    const ordensPrestadores: Writable<OrdemPrestador[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/ordensprestadores');
      if (response.ok) {
        const data: OrdemPrestador[] = await response.json();
        ordensPrestadores.set(data);
      }
    });
  
    function navigateToCadastroOrdemPrestador() {
      goto('/ordensprestadores/cadastro');
    }
  </script>
  
  <style>
    .container {
      max-width: 800px;
      margin: auto;
      padding: 1rem;
    }
    .button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .ordemprestador {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: #f9f9f9;
    }
  </style>
  
  <div class="container">
    <h2>Lista de Ordens de Prestadores</h2>
    <button class="button" on:click={navigateToCadastroOrdemPrestador}>Cadastrar Nova Ordem de Prestador</button>
    <div>
      {#each $ordensPrestadores as ordem}
        <div class="ordemprestador">
          <p><strong>Ordem de Serviço:</strong> OS #{ordem.os_id} - Veículo: {ordem.ordemDeServico.placa}</p>
          <p><strong>Prestador:</strong> {ordem.prestador.nome}</p>
          <p><strong>Data de Início:</strong> {new Date(ordem.data_inicio).toLocaleDateString()}</p>
          {#if ordem.data_fim}
            <p><strong>Data de Fim:</strong> {new Date(ordem.data_fim).toLocaleDateString()}</p>
          {/if}
          <p><strong>Descrição da Tarefa:</strong> {ordem.descricao_tarefa}</p>
        </div>
      {/each}
    </div>
  </div>
  