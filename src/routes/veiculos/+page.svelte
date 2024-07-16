<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import PageLayout from "../../components/PageLayout.svelte";
  import ContactCard from "../../components/ContactCard.svelte";

  type Cliente = {
    id: number;
    nome: string;
  };

  type Veiculo = {
    placa: string;
    chassi: string;
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
    cliente: Cliente;
  };

  const veiculos: Writable<Veiculo[]> = writable([]);

  onMount(async () => {
    const response = await fetch("/api/veiculos");
    if (response.ok) {
      const data: Veiculo[] = await response.json();
      veiculos.set(data);
    }
  });

  async function editarVeiculo(placa: string) {
    goto(`/veiculos/editar/${placa}`);
  }

  async function excluirVeiculo(placa: string) {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
      const response = await fetch(`/api/veiculos/${placa}`, {
        method: "DELETE",
      });
      if (response.ok) {
        veiculos.update((veiculos) =>
          veiculos.filter((veiculo) => veiculo.placa !== placa)
        );
      }
    }
  }
</script>

<PageLayout>
  <div class="row">
    {#each $veiculos as veiculo}
      <div class="col-md-4 mb-4">
        <ContactCard>
          <span slot="name">{veiculo.cliente.nome}</span>
          <span slot="placa">{veiculo.placa}</span>
          <span slot="chassi">{veiculo.chassi}</span>
          <span slot="marca">{veiculo.marca}</span>
          <span slot="modelo">{veiculo.modelo}</span>
          <span slot="ano">{veiculo.ano}</span>
          <span slot="cor">{veiculo.cor}</span>
          <div slot="actions">
            <button
              class="bg-dark btn btn-primary me-2"
              on:click={() => editarVeiculo(veiculo.placa)}
            >
              <i class="bi bi-pencil-fill me-1"></i> Editar
            </button>
            <button
              class="btn btn-danger"
              on:click={() => excluirVeiculo(veiculo.placa)}
            >
              <i class="bi bi-trash-fill me-1"></i> Excluir
            </button>
          </div>
        </ContactCard>
      </div>
    {/each}
  </div>
</PageLayout>
