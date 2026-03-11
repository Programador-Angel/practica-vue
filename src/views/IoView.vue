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

function entradaSalida() {
  const nombre = window.prompt('¿Cómo te llamas?')
  if (!nombre) return

  abrirModal(`<p>¡Hola, <strong>${nombre}</strong>! 😄</p>`)
}

function sumaLista() {
  const txt = window.prompt('Escribe números separados por coma (ej. 2,3,5):')
  if (!txt) return

  const arr = txt
    .split(',')
    .map(s => Number(s.trim()))
    .filter(n => !Number.isNaN(n))

  const total = arr.reduce((a, b) => a + b, 0)

  abrirModal(`<p>Números: [${arr.join(', ')}]</p><p>Suma = <strong>${total}</strong></p>`)
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
        <h2>Entrada y salida</h2>
        <p>
          JavaScript permite recibir datos del usuario y mostrar resultados mediante
          formularios, consola, alertas, prompts y el mismo contenido de la página.
        </p>

        <ul class="bullet-two">
          <li><code>prompt()</code> pide datos al usuario.</li>
          <li><code>alert()</code> muestra mensajes simples.</li>
          <li><code>console.log()</code> sirve para depuración.</li>
          <li>En aplicaciones modernas, la salida suele mostrarse en el DOM.</li>
        </ul>

        <div class="examples" style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="button" @click="entradaSalida">Probar: saludo</button>
          <button class="button secondary" @click="sumaLista">Probar: sumar lista</button>
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