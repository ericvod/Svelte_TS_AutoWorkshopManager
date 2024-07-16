<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { writable, type Writable } from "svelte/store";
  import PageLayout from "../../components/PageLayout.svelte";

  type OrdemDeServico = {
    id: number;
    veiculo_placa: string;
    data_abertura: string;
    data_fechamento: string | null;
    status: string;
    descricao_problema: string;
    descricao_servico: string;
  };

  const ordensDeServico: Writable<OrdemDeServico[]> = writable([]);

  onMount(async () => {
    const response = await fetch("/api/ordensdeservico");
    if (response.ok) {
      const data: OrdemDeServico[] = await response.json();
      ordensDeServico.set(data);
    }
  });

  function navigateTo(path: string) {
    goto(path);
  }
</script>

<PageLayout>
  <div class="container">
    <nav class="nav">
      <button on:click={() => navigateTo("/")}>Home</button>
      <button on:click={() => navigateTo("/ordensdeservico/cadastro")}
        >Cadastrar Nova Ordem de Serviço</button
      >
    </nav>
    <h2>Lista de Ordens de Serviço</h2>
    <div>
      {#each $ordensDeServico as ordem}
        <div class="ordemdeservico">
          <p><strong>Veículo Placa:</strong> {ordem.veiculo_placa}</p>
          <p>
            <strong>Data de Abertura:</strong>
            {new Date(ordem.data_abertura).toLocaleDateString()}
          </p>
          {#if ordem.data_fechamento}
            <p>
              <strong>Data de Fechamento:</strong>
              {new Date(ordem.data_fechamento).toLocaleDateString()}
            </p>
          {/if}
          <p><strong>Status:</strong> {ordem.status}</p>
          <p>
            <strong>Descrição do Problema:</strong>
            {ordem.descricao_problema}
          </p>
          <p>
            <strong>Descrição do Serviço:</strong>
            {ordem.descricao_servico}
          </p>
        </div>
      {/each}
    </div>
  </div>
</PageLayout>

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
  .ordemdeservico {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background: #f9f9f9;
  }
</style>
