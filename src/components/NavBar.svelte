<script lang="ts">
  import { goto } from '$app/navigation';

  function navigateTo(path: string) {
    goto(path);
  }
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top rounded" style="width: 600px; margin: auto;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#" on:click={() => navigateTo('/')}>Lista de Veículos</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <button class="bg-dark text-white btn btn-primary" on:click={() => navigateTo('/')}>
            <i class="bi bi-house-door me-2"></i> Home
          </button>
        </li>
        <li class="nav-item">
          <button class="bg-dark text-white btn btn-primary" on:click={() => navigateTo('/veiculos/cadastro')}>
            <i class="bi bi-plus-circle me-2"></i> Cadastrar Novo Veículo
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .navbar {
    border-radius: 10px;
  }
  .navbar .btn {
    color: white;
    margin-left: 1rem;
  }
  .navbar .btn:hover {
    background-color: #004494;
  }
</style>
