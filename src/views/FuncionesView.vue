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

function funcionesDemo() {
  function cuadrado(x) {
    return x * x
  }

  const cubo = function (x) {
    return x * x * x
  }

  const doble = x => x * 2

  const n = Number(window.prompt('Número para evaluar (ej. 3):'))

  if (Number.isNaN(n)) {
    abrirModal('<p>Ingresa un número válido.</p>')
    return
  }

  abrirModal(`
    <ul>
      <li>cuadrado(${n}) = <strong>${cuadrado(n)}</strong></li>
      <li>cubo(${n}) = <strong>${cubo(n)}</strong></li>
      <li>doble(${n}) = <strong>${doble(n)}</strong></li>
    </ul>
  `)
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
        <h2>Funciones</h2>

        <pre class="code">
// Declaración
function cuadrado(x){ return x*x; }
// Expresión
const cubo = function(x){ return x*x*x; };
// Flecha
const doble = x => x*2;
// Parámetros por defecto y rest
function sumar(a=0,b=0,...rest){ return rest.reduce((t,n)=>t+n,a+b); }
        </pre>

        <p>
          Las funciones son ciudadanos de primera clase: pueden almacenarse en
          variables, pasarse como argumentos y devolverse como valores. El
          <em>alcance</em> en JS es léxico y se forma una cadena de ámbitos para
          resolver identificadores.
        </p>

        <div class="examples">
          <button class="button" @click="funcionesDemo">
            Probar: cuadrado, cubo y doble
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