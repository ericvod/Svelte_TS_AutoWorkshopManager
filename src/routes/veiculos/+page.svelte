<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
  
    type Veiculo = {
      placa: string;
      chassi: string;
      marca: string;
      modelo: string;
      ano: number;
      cor: string;
      proprietario: {
        nome: string;
      };
    };
  
    const veiculos: Writable<Veiculo[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/veiculos');
      if (response.ok) {
        const data: Veiculo[] = await response.json();
        veiculos.set(data);
      }
    });
  
    function navigateToCadastroVeiculo() {
      goto('/veiculos/cadastro');
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
    .proprietario {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: #f9f9f9;
    }
    .veiculo {
      padding-left: 1rem;
      border-left: 3px solid #007bff;
      margin-bottom: 0.5rem;
    }
  </style>
  
  <div class="container">
    <h2>Lista de Veículos e Proprietários</h2>
    <button class="button" on:click={navigateToCadastroVeiculo}>Cadastrar Novo Veículo</button>
    <div>
      {#each $veiculos as veiculo}
        <div class="proprietario">                                                                          
          <p><strong>Proprietário:</strong> {veiculo.proprietario.nome}</p>
          <div class="veiculo">
            <p><strong>Placa:</strong> {veiculo.placa}</p>
            <p><strong>Chassi:</strong> {veiculo.chassi}</p>
            <p><strong>Marca:</strong> {veiculo.marca}</p>
            <p><strong>Modelo:</strong> {veiculo.modelo}</p>
            <p><strong>Ano:</strong> {veiculo.ano}</p>
            <p><strong>Cor:</strong> {veiculo.cor}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
  