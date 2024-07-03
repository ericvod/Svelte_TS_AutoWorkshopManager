<script lang="ts">
    import { goto } from '$app/navigation';
  
    function navigateTo(path: string) {
      goto(path);
    }
  </script>
  
  <div class="bg-dark text-white p-3 d-flex flex-column align-items-start vh-100" style="width: 325px;">
    <button class="btn btn-dark w-100 mb-3 d-flex align-items-center" on:click={() => navigateTo('/')}>
      <i class="bi bi-house-door-fill me-2"></i> Home
    </button>
    <div class="dropdown w-100">
      <button class="btn btn-dark w-100 dropdown-toggle" type="button" id="gerenciarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        Gerenciar
      </button>
      <ul class="bg-dark dropdown-menu w-100" aria-labelledby="gerenciarDropdown">
        <li><a class="bg-dark text-white dropdown-item" href="#" on:click={() => navigateTo('/clientes')}>Gerenciar Clientes</a></li>
        <li><a class="bg-dark text-white dropdown-item" href="#" on:click={() => navigateTo('/funcionarios')}>Gerenciar Funcionários</a></li>
        <li><a class="bg-dark text-white dropdown-item" href="#" on:click={() => navigateTo('/ordensdeservico')}>Gerenciar Ordens de Serviço</a></li>
        <li><a class="bg-dark text-white dropdown-item" href="#" on:click={() => navigateTo('/veiculos')}>Gerenciar Veículos</a></li>
        <li><a class="bg-dark text-white dropdown-item" href="#" on:click={() => navigateTo('/estoque')}>Gerenciar Estoque</a></li>
        <li><a class="bg-dark text-white dropdown-item" href="#" on:click={() => navigateTo('/compras')}>Gerenciar Compras</a></li>
        <li><a class="bg-dark text-white dropdown-item" href="#" on:click={() => navigateTo('/ordemservicofuncionario')}>Gerenciar Ordens de Prestadores</a></li>
      </ul>
    </div>
  </div>
  