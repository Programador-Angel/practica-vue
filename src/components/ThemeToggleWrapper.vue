<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeToggle } from '@angelit8/myui-kit'
import '@angelit8/myui-kit/style.css'

const container = ref(null)
let root = null

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  applyTheme(savedTheme)

  if (container.value) {
    root = createRoot(container.value)

    root.render(
      React.createElement(ThemeToggle, {
        theme: savedTheme,
        onThemeChange: applyTheme
      })
    )
  }
})

onBeforeUnmount(() => {
  if (root) root.unmount()
})
</script>

<template>
  <div ref="container"></div>
</template>
