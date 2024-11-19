import * as monaco from 'monaco-editor'
import { predictionsText } from '@services/kapi'

let bearerToken = null

const listenToInput = (model, position) => {
  if (!model || !position) return

  // 獲取當前內容
  const fullContent = model.getValue()

  // 計算插入位置的偏移量
  const offset = model.getOffsetAt(position)

  // 滑鼠位置插入 <prompt> 標籤
  const startWord = fullContent.slice(0, offset)
  const endWord = fullContent.slice(offset)
  return `${startWord}[prompt]${endWord}`
}

const provideInlineCompletions = async (model, position, _context, _token) => {
  const items = []
  const inputContent = listenToInput(model, position)
  if (inputContent.trim() === '[prompt]') return Promise.resolve({ items })

  const currentLine = model.getLineContent(position.lineNumber)
  const prediction = await predictionsText(bearerToken, inputContent)

  const insertText = prediction || ''
  const label = currentLine
  const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column)
  if (insertText) {
    items.push({ insertText, range, label })
  }

  return Promise.resolve({ items })
}

const freeInlineCompletions = () => {}

const registerInlineCompletionsProvider = (oauthToken) => {
  bearerToken = oauthToken.bearer_token

  return {
    provideInlineCompletions,
    freeInlineCompletions
  }
}

export { registerInlineCompletionsProvider }
