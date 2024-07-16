<script lang="ts">
  import NavBar from "./NavBar.svelte";
  import Sidebar from "./Sidebar.svelte";
  import type { Writable } from "svelte/store";
</script>

<slot name="scripts"></slot>

<div class="d-flex">
  <Sidebar />
  <div class="flex-grow-1 p-4">
    <NavBar />
    <div
      class="container mt-4"
      style="overflow-y: auto; height: calc(100vh - 100px);"
    >
      <slot />
    </div>
  </div>
</div>

<style>
  .container {
    overflow-y: auto;
    height: calc(100vh - 100px);
  }
</style>
