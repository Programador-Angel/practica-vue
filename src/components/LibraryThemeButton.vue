<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from '@angelit8/myui-kit'
import '@angelit8/myui-kit/style.css'

const container = ref(null)
const theme = ref('dark')
let root = null

function applyTheme(newTheme) {
  theme.value = newTheme
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
  renderReactButton()
}

function toggleTheme() {
  const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(nextTheme)
}

function renderReactButton() {
  if (!root) return

  root.render(
    React.createElement(Button, {
      onClick: toggleTheme,
      label: theme.value === 'dark' ? 'Modo claro' : 'Modo oscuro'
    })
  )
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  theme.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)

  if (container.value) {
    root = createRoot(container.value)
    renderReactButton()
  }
})

onBeforeUnmount(() => {
  if (root) root.unmount()
})
</script>

<template>
  <div ref="container" class="theme-button-host"></div>
</template>