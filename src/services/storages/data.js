import { chromeStorage, dataStateKey } from './base'

const dataState = {
  get: () => chromeStorage.get(dataStateKey),
  set: (newState) => chromeStorage.set(dataStateKey, newState),
  update: async (partialState) => {
    const currentState = (await chromeStorage.get(dataStateKey)) || {}
    return chromeStorage.set(dataStateKey, { ...currentState, ...partialState })
  }
}

export { dataState }
