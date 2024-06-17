<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { writable, type Writable } from 'svelte/store';

  type OrdemDeServico = {
    os_id: number;
    placa: string;
    data_abertura: string;
    data_fechamento: string | null;
    status: string;
    descricao_problema: string;
    descricao_servico: string;
    veiculo: {
      modelo: string;
    };
  };

  const ordensDeServico: Writable<OrdemDeServico[]> = writable([]);

  onMount(async () => {
    const response = await fetch('/api/ordensdeservico');
    if (response.ok) {
      const data: OrdemDeServico[] = await response.json();
      ordensDeServico.set(data);
    }
  });

  function navigateToCadastroOrdemDeServico() {
    goto('/ordensdeservico/cadastro');
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
  .ordemdeservico {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background: #f9f9f9;
  }
</style>

<div class="container">
  <h2>Lista de Ordens de Serviço</h2>
  <button class="button" on:click={navigateToCadastroOrdemDeServico}>Cadastrar Nova Ordem de Serviço</button>
  <div>
    {#each $ordensDeServico as ordem}
      <div class="ordemdeservico">
        <p><strong>Veículo:</strong> {ordem.placa} - {ordem.veiculo.modelo}</p>
        <p><strong>Data de Abertura:</strong> {new Date(ordem.data_abertura).toLocaleDateString()}</p>
        {#if ordem.data_fechamento}
          <p><strong>Data de Fechamento:</strong> {new Date(ordem.data_fechamento).toLocaleDateString()}</p>
        {/if}
        <p><strong>Status:</strong> {ordem.status}</p>
        <p><strong>Descrição do Problema:</strong> {ordem.descricao_problema}</p>
        <p><strong>Descrição do Serviço:</strong> {ordem.descricao_servico}</p>
      </div>
    {/each}
  </div>
</div>
