<script setup>
import { ref, onMounted, watch } from 'vue'
import * as monaco from 'monaco-editor'
import { registerInlineCompletionsProvider } from './registers/inline_completions_provider'

const editorValueModel = defineModel()
const emit = defineEmits(['update:modelValue', 'onEditor', 'onDidChangeModelContent'])

const props = defineProps({
  editorTheme: { type: String, default: 'vs' },
  oauthToken: { type: Object, required: true }
})

let editor = null
const editorEl = ref(null)

const setupEditor = async () => {
  if (!editor && editorEl.value) {
    const editorTheme = props.editorTheme === 'dark' ? 'vs-dark' : 'vs'

    editor = monaco.editor.create(editorEl.value, {
      value: editorValueModel.value,
      theme: editorTheme,
      language: 'plaintext',
      wordWrap: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      inlineSuggest: { enabled: true },
      fontSize: 16,
      glyphMargin: false,
      folding: false,
      lineNumbers: 'off',
      // lineDecorationsWidth: 0,
      lineNumbersMinChars: 3,
      automaticLayout: true,
      contextmenu: false,
      lineHeight: 32
    })

    emit('onEditor', editor)

    // listen input change
    editor.onDidChangeModelContent(listenToInput)
    // trigger inline suggest when mouse down
    editor.onMouseDown(onInlineSuggest)

    monaco.languages.registerInlineCompletionsProvider(
      'plaintext',
      registerInlineCompletionsProvider(props.oauthToken)
    )
  }
}

const listenToInput = () => {
  emit('update:modelValue', editor.getModel().getValue())
}

const onInlineSuggest = (_event) => {
  editor.trigger('keyboard', 'editor.action.inlineSuggest.trigger', {})
}

onMounted(() => {
  setupEditor()
})

watch(() => props.editorTheme, () => {
  if (!editor) return

  const theme = props.editorTheme === 'dark' ? 'vs-dark' : 'vs'
  editor.updateOptions({ theme })
})
</script>

<template>
  <div id="editor" ref="editorEl" />
</template>
