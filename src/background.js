// import i18n
import I18n from '@commons/i18n'
import { predictionsImage, imagesExtractText } from '@services/kapi'
import { chromeStorage } from '@services/storages/base'
import { dataState } from '@services/storages/data'

// open side panel
const openSidePanel = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.sidePanel.open({ tabId: tabs[0].id })
  })
}

const insertEditorContent = async (content) => {
  return await chromeStorage.set('insertEditorContent', content)
}

const onCursorProgress = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'onCursorProgress' })
  })
}
const offCursorProgress = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'offCursorProgress' })
  })
}

chrome.action.onClicked.addListener((tab) => {
  openSidePanel()
})

// create context menu
chrome.runtime.onInstalled.addListener(async (object) => {
  // first time install than open help page
  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    const locale = I18n.global.locale.value.includes('zh') ? 'zh/' : ''
    const getStartedUrl = `https://docs.kapinote.co/${locale}getting-started`
    chrome.tabs.create({ url: getStartedUrl })
  }

  // selection
  chrome.contextMenus.create({
    id: 'content-menu-selection-to-note',
    title: I18n.global.t('contextMenus.selection'),
    contexts: ['selection']
  })

  // images
  chrome.contextMenus.create({
    id: 'content-menu-image-to-note',
    title: I18n.global.t('contextMenus.image'),
    contexts: ['image']
  })
  chrome.contextMenus.create({
    id: 'content-menu-images-extract-text',
    title: I18n.global.t('contextMenus.image_extract_text'),
    parentId: 'content-menu-image-to-note',
    contexts: ['image']
  })
  chrome.contextMenus.create({
    id: 'content-menu-predictions-image',
    title: I18n.global.t('contextMenus.image_describe'),
    parentId: 'content-menu-image-to-note',
    contexts: ['image']
  })
})

// handle context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'content-menu-selection-to-note') {
    onCursorProgress()
    openSidePanel()

    await insertEditorContent(info.selectionText)
    offCursorProgress()
  } else if (info.menuItemId === 'content-menu-images-extract-text') {
    onCursorProgress()
    openSidePanel()

    const data = await dataState.get()
    const bearerToken = data?.userInfo?.oauthToken?.bearer_token
    const result = await imagesExtractText(bearerToken, info.srcUrl)

    await insertEditorContent(result)
    offCursorProgress()
  } else if (info.menuItemId === 'content-menu-predictions-image') {
    onCursorProgress()
    openSidePanel()

    const data = await dataState.get()
    const bearerToken = data?.userInfo?.oauthToken?.bearer_token
    const editorContent = data?.editorContent
    const content = `${editorContent}[prompt]`
    const result = await predictionsImage(bearerToken, content, info.srcUrl)

    await insertEditorContent(result)
    offCursorProgress()
  }
})
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'take-screenshot') {
    openSidePanel()

    const data = await dataState.get()
    const oauthToken = data?.userInfo?.oauthToken
    if (!oauthToken) return

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'initializeScreenshot' })
    })
  } else if (command === 'open-side-panel') {
    openSidePanel()
  }
})

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'captureArea') {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        action: 'cropImage',
        dataUrl
      })
    })
  } else if (request.action === 'openSidePanel') {
    chrome.sidePanel.open({ tabId: sender.tab.id })
  } else if (request.action === 'closeSidePanel') {
    chrome.tabs.sendMessage(sender.tab.id, {
      action: 'closeSidePanel'
    })
  } else if (request.action === 'editorInsertText') {
    const data = await dataState.get()
    const bearerToken = data?.userInfo?.oauthToken?.bearer_token
    const result = await imagesExtractText(bearerToken, request.dataUrl)

    insertEditorContent(result)
  }
})

// chrome.runtime.setUninstallURL('https://www.google.com')
