<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'

const modalAbierto = ref(false)
const modalHtml = ref('')

function abrirModal(html) {
  modalHtml.value = html
  modalAbierto.value = true
}

function cerrarModal() {
  modalAbierto.value = false
  modalHtml.value = ''
}

function comparar() {
  const a = Number(window.prompt('Ingresa el primer número:'))
  const b = Number(window.prompt('Ingresa el segundo número:'))

  let msg = ''

  if (Number.isNaN(a) || Number.isNaN(b)) {
    msg = 'Debes ingresar números válidos.'
  } else if (a === b) {
    msg = `${a} es IGUAL que ${b}`
  } else if (a > b) {
    msg = `${a} es MAYOR que ${b}`
  } else {
    msg = `${a} es MENOR que ${b}`
  }

  abrirModal(`<p>${msg}</p>`)
}

function alPresionarTecla(e) {
  if (e.key === 'Escape') {
    cerrarModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', alPresionarTecla)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', alPresionarTecla)
})
</script>

<template>
  <main class="layout no-sidebar">
    <section class="content">
      <article class="card">
        <h2>Operadores y expresiones</h2>

        <ul class="bullet-two">
          <li><strong>Aritméticos:</strong> <code>+ - * / % **</code></li>
          <li><strong>Asignación:</strong> <code>= += -= *= /= %= **=</code></li>
          <li>
            <strong>Comparación:</strong>
            <code>== != === !== &lt; &gt; &lt;= &gt;=</code>
            (usa <code>===</code> para evitar coerción).
          </li>
          <li>
            <strong>Lógicos:</strong>
            <code>&amp;&amp;</code> (AND), <code>||</code> (OR), <code>!</code> (NOT).
            Soportan <em>cortocircuito</em>.
          </li>
          <li>
            <strong>Concatenación:</strong>
            con <code>+</code> entre strings; usa <code>`template literals`</code>
            para legibilidad.
          </li>
          <li>
            <strong>Destructuración y spread:</strong>
            <code>{a,b} = obj</code>, <code>[x,...rest]</code>, <code>{...copia}</code>.
          </li>
        </ul>

        <div class="examples">
          <button class="button" @click="comparar">
            Probar: comparar dos números
          </button>
        </div>
      </article>
    </section>

    <div
      class="modal"
      :aria-hidden="!modalAbierto"
      :style="{ display: modalAbierto ? 'grid' : 'none' }"
      role="dialog"
      aria-labelledby="modal-title"
      @click.self="cerrarModal"
    >
      <div class="modal-content">
        <button class="modal-close" aria-label="Cerrar" @click="cerrarModal">
          ×
        </button>
        <h3 id="modal-title">Resultado</h3>
        <div class="modal-body" v-html="modalHtml"></div>
      </div>
    </div>
  </main>
</template>