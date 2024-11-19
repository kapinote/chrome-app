import * as path from 'node:path'

const resolvePath = (dirPath) => {
  return path.resolve(__dirname, '..', '..', dirPath)
}

const resolve = {
  alias: {
    '@root': resolvePath('./'),
    '@src': resolvePath('src'),
    '@commons': resolvePath('src/commons'),
    '@components': resolvePath('src/components'),
    '@contents': resolvePath('src/contents'),
    '@views': resolvePath('src/views'),
    '@layouts': resolvePath('src/views/layouts'),
    '@locales': resolvePath('src/locales'),
    '@stylesheets': resolvePath('src/assets/stylesheets'),
    '@images': resolvePath('src/assets/images'),
    '@stores': resolvePath('src/stores'),
    '@services': resolvePath('src/services'),
    '@config': resolvePath('src/config')
  }
}

export default resolve
