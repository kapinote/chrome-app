import * as screenshotStyle from '@stylesheets/screenshot.scss'
import { createApp } from 'vue'
import I18n from '@commons/i18n'
import ScreenshotApp from '@src/ScreenshotApp.vue'

const screenshotEl = document.createElement('div')
screenshotEl.id = 'autoCompleteScreenshot'
document.body.appendChild(screenshotEl)

createApp(ScreenshotApp).use(I18n).mount(screenshotEl)
