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

function control() {
  let tabla = '<pre>'
  for (let i = 1; i <= 10; i++) {
    tabla += `5 x ${i} = ${5 * i}\n`
  }
  tabla += '</pre>'

  abrirModal(tabla)
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
        <h2>Estructuras de control</h2>
        <p>
          Las estructuras de control permiten tomar decisiones y repetir acciones.
          Son básicas para construir lógica en cualquier programa.
        </p>

        <ul class="bullet-two">
          <li><code>if</code>, <code>else if</code> y <code>else</code> para decisiones.</li>
          <li><code>switch</code> para comparar varios casos.</li>
          <li><code>for</code>, <code>while</code> y <code>do...while</code> para repeticiones.</li>
          <li><code>break</code> y <code>continue</code> alteran el flujo de un ciclo.</li>
        </ul>

        <div class="examples">
          <button class="button" @click="control">
            Probar: tabla del 5
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