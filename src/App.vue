<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import logo from './assets/logo.svg'
import LibraryThemeButton from './components/LibraryThemeButton.vue'

const q = ref('')
const anio = ref('')
const lastUpdated = ref('')

onMounted(() => {
  const now = new Date()
  const fecha = now.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })

  anio.value = now.getFullYear()
  lastUpdated.value = document.lastModified
    ? new Date(document.lastModified).toLocaleString('es-MX')
    : fecha
})
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="logo-link" aria-label="Inicio">
      <img :src="logo" alt="Logo JS Práctica" class="logo" />
    </RouterLink>

    <div class="brand">
      <h1>Práctica de JavaScript</h1>
      <p class="subtitle">Programación Web · Guía con ejemplos ejecutables</p>
    </div>

    <div class="header-tools">
      <form class="search" role="search" @submit.prevent>
        <label for="q" class="sr-only">Buscar</label>
        <input
          id="q"
          v-model="q"
          type="search"
          placeholder="Buscar en esta página..."
          autocomplete="off"
        />
      </form>

      <LibraryThemeButton />
    </div>
  </header>

  <nav class="topnav" aria-label="Navegación principal">
    <ul>
      <li><RouterLink to="/">Inicio</RouterLink></li>
      <li><RouterLink to="/que-es">¿Qué es JS?</RouterLink></li>
      <li><RouterLink to="/tipos">Tipos de datos</RouterLink></li>
      <li><RouterLink to="/operadores">Operadores</RouterLink></li>
      <li><RouterLink to="/funciones">Funciones</RouterLink></li>
      <li><RouterLink to="/conversion">Conversión</RouterLink></li>
      <li><RouterLink to="/variables">Variables</RouterLink></li>
      <li><RouterLink to="/io">Entrada/Salida</RouterLink></li>
      <li><RouterLink to="/control">Estructuras de control</RouterLink></li>
      <li><RouterLink to="/objetos">Objetos</RouterLink></li>
      <li><RouterLink to="/referencias">Referencias</RouterLink></li>
    </ul>
  </nav>

  <RouterView />

  <footer class="site-footer">
    <p><strong>Autores:</strong> Angel Rodriguez Lopez x Kim Castillo Torres</p>
    <p><strong>Contacto:</strong> angel_rodriguez@upatlautla.edu.mx</p>
    <p>
      <strong>Copyright:</strong> © {{ anio }} Angel Lopez.
      Todos los derechos reservados.
    </p>
    <p>
      <strong>Políticas y legales:</strong>
      <RouterLink to="/privacidad">Aviso de privacidad</RouterLink> ·
      <RouterLink to="/referencias">Licencias/Créditos</RouterLink>
    </p>
    <p>
      <strong>Enlaces relacionados:</strong>
      <a
        href="https://developer.mozilla.org/es/docs/Web/JavaScript"
        target="_blank"
        rel="noopener"
      >
        MDN JavaScript
      </a>
      ·
      <a
        href="https://tc39.es/ecma262/"
        target="_blank"
        rel="noopener"
      >
        Especificación ECMAScript
      </a>
    </p>
    <p>
      <strong>Enlaces internos:</strong>
      <RouterLink to="/">Inicio</RouterLink> ·
      <RouterLink to="/referencias">Referencias</RouterLink>
    </p>
    <p>Última actualización: <span>{{ lastUpdated }}</span></p>
  </footer>
</template>