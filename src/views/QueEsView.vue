<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const fechaPagina = ref('')
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

function saludo() {
  abrirModal('<p><strong>Hola!</strong> Este modal fue abierto con Vue. 🎉</p>')
}

function alPresionarTecla(e) {
  if (e.key === 'Escape') {
    cerrarModal()
  }
}

onMounted(() => {
  fechaPagina.value = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })

  window.addEventListener('keydown', alPresionarTecla)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', alPresionarTecla)
})
</script>

<template>
  <main class="layout">
    <aside class="sidebar">
      <h3>En esta página</h3>
      <ol>
        <li><a href="#intro">Definición</a></li>
        <li><a href="#para-que">¿Para qué sirve?</a></li>
        <li><a href="#caracteristicas">Características clave</a></li>
      </ol>
      <div class="notice small">
        <strong>Fecha de la página:</strong> {{ fechaPagina }}
      </div>
    </aside>

    <section class="content">
      <article id="intro" class="card">
        <h2>¿Qué es JavaScript?</h2>
        <p>
          <strong>JavaScript</strong> es un lenguaje de programación interpretado,
          orientado a eventos y multiparadigma (imperativo, funcional y orientado
          a objetos) que se ejecuta principalmente en el navegador y, gracias a
          entornos como Node.js, también en el servidor. Permite manipular el
          <em>DOM</em>, realizar peticiones a servicios (<em>APIs</em>), validar
          formularios, crear interfaces dinámicas y desarrollar aplicaciones web
          modernas de una sola página (SPA).
        </p>

        <div class="examples">
          <button class="button" @click="saludo">
            Probar: saludo en modal
          </button>
        </div>
      </article>

      <article id="para-que" class="card">
        <h2>¿Para qué sirve?</h2>
        <ul class="bullet-two">
          <li>Agregar interactividad: menús, modales, validaciones y animaciones.</li>
          <li>Conectar con servidores vía <code>fetch</code> para consumir/mandar datos.</li>
          <li>Trabajar con almacenamiento local (<code>localStorage</code>) y sesiones.</li>
          <li>Construir aplicaciones completas con frameworks (no usados en esta práctica).</li>
        </ul>
      </article>

      <article id="caracteristicas" class="card">
        <h2>Características clave</h2>
        <ul class="bullet-two">
          <li>
            <strong>Débilmente tipado</strong> y <strong>dinámico</strong>:
            los tipos se resuelven en tiempo de ejecución.
          </li>
          <li>
            <strong>Monohilo</strong> con <em>event loop</em> y APIs del navegador
            para operaciones asíncronas.
          </li>
          <li>Amplio ecosistema y compatibilidad en la mayoría de navegadores.</li>
        </ul>
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