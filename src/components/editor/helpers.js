import { chromeStorage } from '@services/storages/base'

const debounceWithPromise = (func, delay) => {
  let timeoutId
  return (...args) => {
    return new Promise((resolve) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        resolve(func.apply(this, args))
      }, delay)
    })
  }
}

const updateEditorValue = async (editor, content = null) => {
  const editContent = content === null ? await chromeStorage.get('insertEditorContent') : content
  if (!editContent || editContent.trim().length === 0) return

  const newLineContent = editContent.split('  ').join('\n')

  const editorContent = editor.getValue()
  let newContent = ''
  if (editorContent.length > 0) {
    newContent = `${editorContent}\n${newLineContent}`
  } else {
    newContent = newLineContent
  }

  editor.setValue(newContent)

  await chromeStorage.set('insertEditorContent', null)
}

export { debounceWithPromise, updateEditorValue }
