import 'dotenv-flow/config'
import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version } = packageJson

const host_permissions = [`${process.env.VITE_KAPI_URL}/*`]
const key = process.env.VITE_KAPI_KEY

export default defineManifest((env) => {
  const name = env.mode === 'development' ? 'KapiNote Dev' : 'KapiNote'

  return {
    manifest_version: 3,
    name,
    description: 'KapiNote',
    key,
    version,
    permissions: ['activeTab', 'storage', 'contextMenus', 'sidePanel', 'identity'],
    content_scripts: [
      {
        matches: ['<all_urls>'],
        js: ['src/content.js']
      }
    ],
    background: {
      service_worker: 'src/background.js',
      type: 'module'
    },
    host_permissions,
    action: {
      default_icon: 'src/assets/images/logo/logo@2x.png'
    },
    icons: {
      16: 'src/assets/images/logo/logo@1x.png',
      32: 'src/assets/images/logo/logo@1x.png',
      48: 'src/assets/images/logo/logo@2x.png',
      128: 'src/assets/images/logo/logo@2x.png'
    },
    side_panel: {
      default_path: 'src/side_panel.html'
    },
    commands: {
      'take-screenshot': {
        suggested_key: {
          default: 'Alt+Shift+R',
          mac: 'Alt+Shift+R'
        },
        description: 'Take a screenshot'
      },
      'open-side-panel': {
        suggested_key: {
          default: 'Alt+Shift+E',
          mac: 'Alt+Shift+E'
        },
        description: 'Open side panel'
      }
    }
  }
})
