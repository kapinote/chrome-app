// i18n.js
import { createI18n } from 'vue-i18n'

const importLocales = import.meta.glob('../locales/*.json', { eager: true })
const locales = Object.keys(importLocales).map((key) => {
  return key.split('/').pop().split('.')[0]
})

const loadLocaleMessages = () => {
  const messages = {}
  for (const [path, module] of Object.entries(importLocales)) {
    const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = module.default
    }
  }
  return messages
}

// get default language
let locale = 'en' // default language
for (const language of navigator.languages) {
  if (locales.includes(language)) {
    locale = language
    break
  }
}

export default createI18n({
  legacy: false,
  locale,
  fallbackLocale: locale,
  messages: loadLocaleMessages()
})
