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

function objeto() {
  const persona = {
    nombre: 'Angel',
    edad: 20,
    saludar() {
      return 'Hola, soy ' + this.nombre
    }
  }

  abrirModal(`
    <p>Nombre: <strong>${persona.nombre}</strong></p>
    <p>Edad: <strong>${persona.edad}</strong></p>
    <p>Método: <code>saludar()</code> → <strong>${persona.saludar()}</strong></p>
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
        <h2>Objetos</h2>
        <p>
          Los objetos agrupan propiedades y métodos dentro de una misma estructura.
          Son una parte central de JavaScript y permiten modelar entidades del mundo real.
        </p>

        <ul class="bullet-two">
          <li>Se crean con llaves: <code>{ }</code>.</li>
          <li>Tienen propiedades y métodos.</li>
          <li>Se puede acceder con punto o corchetes.</li>
          <li>También existen clases, pero internamente todo se basa en prototipos.</li>
        </ul>

        <div class="examples">
          <button class="button" @click="objeto">
            Probar: objeto persona
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