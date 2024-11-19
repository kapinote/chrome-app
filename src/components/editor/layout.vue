<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useClipboard } from '@vueuse/core'

const { copy, copied } = useClipboard({ legacy: true })

const props = defineProps({
  editorValue: { type: String, default: '' }
})
const editorPlaceholderEl = ref(null)

const onClipboard = () => {
  copy(props.editorValue)
}

const onEditorPlaceholder = () => {
  if (!editorPlaceholderEl.value) return

  if (props.editorValue.trim().length > 0) {
    editorPlaceholderEl.value.style.display = 'none'
  } else {
    editorPlaceholderEl.value.style.display = 'block'
  }
}

const textLength = computed(() => {
  if (props.editorValue) {
    return props.editorValue.length
  }
  return 0
})

watch(() => props.editorValue, () => {
  onEditorPlaceholder()
})

onMounted(() => {
  onEditorPlaceholder()
})
</script>

<template>
  <div id="home" class="relative">
    <template v-if="copied">
      <div class="absolute top-[-10px] left-0 right-0 z-10">
        <div class="alert alert-primary mx-auto w-fit" role="alert" tabindex="-1" aria-labelledby="hs-soft-color-info-label">
          <span v-t="'helpers.copied'"></span>
        </div>
      </div>
    </template>

    <div class="space-y-2">
      <slot />

      <div ref="editorPlaceholderEl" class="editor-placeholder">
        <div v-t="'editor.placeholder.description'"></div>
        <div v-t="'editor.placeholder.shortcut1'"></div>
        <div v-t="'editor.placeholder.shortcut2'"></div>
      </div>

      <div class="flex items-center justify-end text-sm text-neutral-500 space-x-3">
        <span>{{ textLength }}</span>

        <span @click="onClipboard" class="cursor-pointer">
          <svg class="lucide lucide-copy size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        </span>
      </div>
    </div>
  </div>
</template>
