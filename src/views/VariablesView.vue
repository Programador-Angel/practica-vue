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

function variables() {
  let x = 5
  const y = { valor: 10 }

  x = 7
  y.valor = 12

  abrirModal(`
    <p><code>let x = 5; x = 7;</code> → x ahora es <strong>${x}</strong></p>
    <p><code>const y = { valor: 10 }; y.valor = 12;</code> → y.valor ahora es <strong>${y.valor}</strong></p>
    <p>Con <code>const</code> no puedes reasignar la referencia, pero sí modificar el contenido del objeto.</p>
  `)
}

function alPresionarTecla(e) {
  if (e.key === 'Escape') cerrarModal()
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
        <h2>Variables</h2>
        <p>
          En JavaScript se usan <code>let</code>, <code>const</code> y antes también
          <code>var</code>. Hoy lo recomendable es usar <code>let</code> cuando el valor
          cambia y <code>const</code> cuando no se reasigna.
        </p>

        <ul class="bullet-two">
          <li><code>let</code> permite reasignar valores.</li>
          <li><code>const</code> no permite reasignar la referencia.</li>
          <li><code>var</code> tiene alcance de función y hoy se usa menos.</li>
          <li>Los objetos declarados con <code>const</code> sí pueden mutar internamente.</li>
        </ul>

        <div class="examples">
          <button class="button" @click="variables">
            Probar: let y const
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
        <button class="modal-close" aria-label="Cerrar" @click="cerrarModal">×</button>
        <h3 id="modal-title">Resultado</h3>
        <div class="modal-body" v-html="modalHtml"></div>
      </div>
    </div>
  </main>
</template>