<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const fechaPagina = ref('')
const modalAbierto = ref(false)
const modalHtml = ref('')
const cajasActivas = ref([])

const cajas = [
  {
    titulo: 'number',
    descripcion:
      'Representa números en doble precisión (IEEE-754). Soporta <code>NaN</code>, <code>Infinity</code> y <code>-Infinity</code>. Usar <code>Number.isNaN()</code> para detectar <code>NaN</code>.'
  },
  {
    titulo: 'string',
    descripcion:
      'Cadenas de texto UTF-16. Métodos útiles: <code>slice</code>, <code>includes</code>, <code>toUpperCase</code>, <code>trim</code>. Pueden usarse comillas simples, dobles o <em>template literals</em> con <code>`</code>.'
  },
  {
    titulo: 'boolean',
    descripcion:
      'Valores lógicos: <code>true</code> o <code>false</code>. Se usan en condiciones con <code>if</code>, bucles y operadores lógicos.'
  },
  {
    titulo: 'null',
    descripcion:
      'Ausencia intencional de valor. Su tipo histórico es <code>object</code> por compatibilidad.'
  },
  {
    titulo: 'undefined',
    descripcion:
      'Variable declarada sin asignación o propiedad inexistente.'
  },
  {
    titulo: 'symbol',
    descripcion:
      'Identificadores únicos ideales para claves privadas en objetos.'
  },
  {
    titulo: 'bigint',
    descripcion:
      'Enteros arbitrariamente grandes (terminan en <code>n</code>). No se mezclan con <code>number</code> en la misma operación.'
  }
]

function escapeHtml(texto) {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function abrirModal(html) {
  modalHtml.value = html
  modalAbierto.value = true
}

function cerrarModal() {
  modalAbierto.value = false
  modalHtml.value = ''
}

function detectarTipo() {
  const valor = window.prompt('Escribe un valor (ej: 42, "hola", true, null):')
  if (valor === null) return

  let tipo = ''

  try {
    const v = eval(valor)
    tipo = v === null ? 'null' : Array.isArray(v) ? 'array (objeto)' : typeof v
  } catch {
    tipo = 'string (no evaluado)'
  }

  abrirModal(`
    <p>Valor ingresado: <code>${escapeHtml(valor)}</code></p>
    <p>Tipo detectado: <strong>${tipo}</strong></p>
  `)
}

function toggleCaja(index) {
  if (cajasActivas.value.includes(index)) {
    cajasActivas.value = cajasActivas.value.filter(i => i !== index)
  } else {
    cajasActivas.value.push(index)
  }
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
      <h3>Temas</h3>
      <ol>
        <li><a href="#primitivos">Primitivos</a></li>
        <li><a href="#objetos">Objetos</a></li>
        <li><a href="#truthy">Valores truthy/falsy</a></li>
      </ol>
      <div class="notice small">
        <strong>Fecha de la página:</strong> {{ fechaPagina }}
      </div>
    </aside>

    <section class="content">
      <article id="primitivos" class="card">
        <h2>Primitivos</h2>
        <p>
          JS define siete tipos primitivos: <code>number</code>, <code>string</code>,
          <code>boolean</code>, <code>null</code>, <code>undefined</code>,
          <code>symbol</code> y <code>bigint</code>. Se almacenan por valor y son
          inmutables. El motor puede convertir entre tipos automáticamente
          (coerción) en ciertas expresiones.
        </p>

        <div class="grid-3">
          <div
            v-for="(caja, index) in cajas"
            :key="caja.titulo"
            class="info-box"
            :class="{ active: cajasActivas.includes(index) }"
            @click="toggleCaja(index)"
          >
            <h3>{{ caja.titulo }}</h3>
            <p v-html="caja.descripcion"></p>
          </div>
        </div>

        <div class="examples" style="margin-top: 16px;">
          <button class="button" @click="detectarTipo">
            Probar: detectar tipo
          </button>
        </div>
      </article>

      <article id="objetos" class="card">
        <h2>Objetos</h2>
        <p>
          Un objeto es una colección de pares clave-valor. Arreglos, funciones,
          fechas y expresiones regulares son objetos. Se almacenan por referencia
          y pueden mutar. La notación de punto y corchetes permite leer y escribir
          propiedades.
        </p>
      </article>

      <article id="truthy" class="card">
        <h2>Valores truthy y falsy</h2>
        <p>
          <strong>Falsy:</strong>
          <code>false, 0, -0, 0n, "", null, undefined, NaN</code>.
          El resto de los valores son <em>truthy</em>. Esta regla afecta a
          condicionales y cortocircuito lógico.
        </p>
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

<style scoped>
.info-box.active {
  transform: translateY(-2px);
  border-color: #2a406d;
  box-shadow: 0 0 0 1px #2a406d inset;
}
</style>