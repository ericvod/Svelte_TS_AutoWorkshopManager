<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable, type Writable } from 'svelte/store';
  
    type Prestador = {
      prestador_id: number;
      nome: string;
      telefone: string;
      email: string;
      especialidade: string;
    };
  
    const prestadores: Writable<Prestador[]> = writable([]);
  
    onMount(async () => {
      const response = await fetch('/api/prestadores');
      if (response.ok) {
        const data: Prestador[] = await response.json();
        prestadores.set(data);
      }
    });
  
    function navigateToCadastroPrestador() {
      goto('/prestadores/cadastro');
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
    .prestador {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: #f9f9f9;
    }
  </style>
  
  <div class="container">
    <h2>Lista de Prestadores de Serviço</h2>
    <button class="button" on:click={navigateToCadastroPrestador}>Cadastrar Novo Prestador</button>
    <div>
      {#each $prestadores as prestador}
        <div class="prestador">
          <p><strong>Nome:</strong> {prestador.nome}</p>
          <p><strong>Telefone:</strong> {prestador.telefone}</p>
          <p><strong>Email:</strong> {prestador.email}</p>
          <p><strong>Especialidade:</strong> {prestador.especialidade}</p>
        </div>
      {/each}
    </div>
  </div>
  