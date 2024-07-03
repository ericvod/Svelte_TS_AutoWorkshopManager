<article class="card mb-3">
    <div class="card-body">
      <h2 class="card-title">
        <slot name="name">
          <span class="missing">Unknown name</span>
        </slot>
      </h2>
      <div class="card-text">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-car-front-fill me-2"></i>
          <slot name="placa">
            <span class="missing">Unknown Placa</span>
          </slot>
        </div>
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-gear-fill me-2"></i>
          <slot name="chassi">
            <span class="missing">Unknown Chassi</span>
          </slot>
        </div>
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-briefcase-fill me-2"></i>
          <slot name="marca">
            <span class="missing">Unknown Marca</span>
          </slot>
        </div>
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-tags-fill me-2"></i>
          <slot name="modelo">
            <span class="missing">Unknown Modelo</span>
          </slot>
        </div>
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-calendar-fill me-2"></i>
          <slot name="ano">
            <span class="missing">Unknown Ano</span>
          </slot>
        </div>
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-palette-fill me-2"></i>
          <slot name="cor">
            <span class="missing">Unknown Cor</span>
          </slot>
        </div>
        <div class="d-flex mt-3">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </article>
  
  <style>
    .missing {
      color: #999;
    }
  </style>
  