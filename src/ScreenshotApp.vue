<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const showCaptureArea = ref(false)
const showSelection = ref(false)
const isDrawing = ref(false)
const isLoading = ref(false)
const startPosition = ref({ x: 0, y: 0 })
const endPosition = ref({ x: 0, y: 0 })
const minSelectionSize = 40 // 最小選擇區域大小

const selectionStyle = computed(() => {
  const left = Math.min(startPosition.value.x, endPosition.value.x)
  const top = Math.min(startPosition.value.y, endPosition.value.y)
  const width = Math.abs(endPosition.value.x - startPosition.value.x)
  const height = Math.abs(endPosition.value.y - startPosition.value.y)

  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  }
})

const captureInfo = computed(() => {
  const width = Math.max(Math.abs(endPosition.value.x - startPosition.value.x), minSelectionSize)
  const height = Math.max(Math.abs(endPosition.value.y - startPosition.value.y), minSelectionSize)

  return {
    x: Math.min(startPosition.value.x, endPosition.value.x),
    y: Math.min(startPosition.value.y, endPosition.value.y),
    width,
    height,
    devicePixelRatio: window.devicePixelRatio
  }
})

const captureAreaClass = computed(() => {
  return {
    'cursor-progress': isLoading.value
  }
})

const initializeScreenshot = () => {
  resetCaptureState()
  showCaptureArea.value = true
}

const startDrawing = (e) => {
  resetSelectionState()
  isDrawing.value = true
  showSelection.value = true
  startPosition.value = { x: e.clientX, y: e.clientY }
  endPosition.value = { x: e.clientX, y: e.clientY }
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    resetCaptureState()
  }
}

const draw = (e) => {
  if (!isDrawing.value) return
  endPosition.value = { x: e.clientX, y: e.clientY }
}

const endDrawing = () => {
  if (!isDrawing.value) return

  isDrawing.value = false

  if (isValidSelection()) {
    isLoading.value = true
    captureScreenshot()
  } else {
    resetCaptureState()
  }
}

const isValidSelection = () => {
  const width = Math.abs(endPosition.value.x - startPosition.value.x)
  const height = Math.abs(endPosition.value.y - startPosition.value.y)
  return width >= minSelectionSize || height >= minSelectionSize
}

const resetCaptureState = () => {
  resetSelectionState()
  showCaptureArea.value = false
  isLoading.value = false
}

const resetSelectionState = () => {
  isDrawing.value = false
  showSelection.value = false
  startPosition.value = { x: 0, y: 0 }
  endPosition.value = { x: 0, y: 0 }
}

const captureScreenshot = () => {
  chrome.runtime.sendMessage({action: 'captureArea'})
}

const cropImage = (dataUrl) => {
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const dpr = captureInfo.value.devicePixelRatio

    canvas.width = captureInfo.value.width * dpr
    canvas.height = captureInfo.value.height * dpr

    ctx.drawImage(img,
      captureInfo.value.x * dpr,
      captureInfo.value.y * dpr,
      canvas.width,
      canvas.height,
      0, 0, canvas.width, canvas.height
    )

    canvas.toBlob((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      extractTextFromImage(blobUrl)
    }, 'image/png');
  }
  img.src = dataUrl
}

const extractTextFromImage = async (dataUrl) => {
  chrome.runtime.sendMessage({action: 'editorInsertText', dataUrl})

  showCaptureArea.value = false
  isLoading.value = true
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'initializeScreenshot') {
    initializeScreenshot()
  } else if (request.action === 'cropImage') {
    cropImage(request.dataUrl)
  } else if (request.action === 'onCursorProgress') {
    document.body.classList.add('cursor-progress')
  } else if (request.action === 'offCursorProgress') {
    document.body.classList.remove('cursor-progress')
  }
})
</script>

<template>
  <div v-if="showCaptureArea"
       @mousedown="startDrawing"
       @mousemove="draw"
       @mouseup="endDrawing"
       id="capture-area"
       :class="captureAreaClass">
    <div v-if="showSelection" id="selection" :style="selectionStyle"></div>
  </div>
</template>
