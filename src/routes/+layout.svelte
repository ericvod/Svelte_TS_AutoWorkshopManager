<script lang="ts">
    export let data;

  </script>
  
  <slot />
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
  
    body {
      font-family: 'Roboto', sans-serif;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
      color: #333;
    }
  
    h1, h2, h3, h4, h5, h6 {
      font-weight: 500;
    }
  
    p {
      font-weight: 300;
    }
  
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  </style>
  