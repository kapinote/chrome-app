const chromeStorage = {
  get: (key) => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (result) => {
        resolve(key ? result[key] : result)
      })
    })
  },

  set: (key, value) => {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, resolve)
    })
  },

  onChange: (callback) => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'sync') {
        callback(changes)
      }
    })
  }
}

const dataStateKey = 'dataState'

export { chromeStorage, dataStateKey }
