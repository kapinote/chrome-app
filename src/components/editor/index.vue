<script setup>
import { ref, watch, onMounted } from 'vue'
import Editor from './editor.vue'
import Layout from './layout.vue'
import { useSidePanelStore } from '@stores/side_panel/store'
import { useStorageStore } from '@stores/storage/store'
import { updateEditorValue } from './helpers'

const sidePanelStore = useSidePanelStore()
const storageStore = useStorageStore()
const editorValue = ref(storageStore.editorContent)
let editor = null

chrome.storage.onChanged.addListener(async (changes) => {
  if (changes?.insertEditorContent?.newValue) {
    await updateEditorValue(editor, changes.insertEditorContent.newValue)
  }
})

const onEditor = (newEditor) => {
  editor = newEditor
}

watch(() => editorValue.value, () => {
  storageStore.assignData('editorContent', editorValue.value)
})

onMounted(async () => {
  await updateEditorValue(editor)
})
</script>

<template>
  <Layout :editorValue="editorValue">
    <Editor v-model="editorValue"
            @onEditor="onEditor"
            :editorTheme="sidePanelStore.theme"
            :oauthToken="storageStore.oauthToken" />
  </Layout>
</template>
