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

function conversion() {
  const s = window.prompt('Escribe un número como texto (ej. "10"):')
  if (s === null) return

  const n = Number(s)
  const suma1 = 1 + s
  const suma2 = 1 + n

  abrirModal(`
    <p>Entrada: <code>${JSON.stringify(s)}</code></p>
    <p><code>Number("${s}")</code> = <strong>${n}</strong></p>
    <p><code>1 + "${s}"</code> → <strong>${suma1}</strong> (string)</p>
    <p><code>1 + Number("${s}")</code> → <strong>${suma2}</strong> (number)</p>
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
        <h2>Conversión de tipos</h2>
        <p>
          JavaScript puede convertir valores entre tipos de forma explícita o implícita.
          Por ejemplo, <code>Number()</code>, <code>String()</code> y <code>Boolean()</code>
          permiten transformar datos. También existe coerción automática en algunas operaciones.
        </p>

        <ul class="bullet-two">
          <li><code>Number("10")</code> convierte texto a número.</li>
          <li><code>String(25)</code> convierte número a cadena.</li>
          <li><code>Boolean(1)</code> devuelve <code>true</code>.</li>
          <li>La coerción puede causar resultados inesperados si no se controla.</li>
        </ul>

        <div class="examples">
          <button class="button" @click="conversion">
            Probar: conversión de texto a número
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