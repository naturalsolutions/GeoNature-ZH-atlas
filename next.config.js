const yaml = require('js-yaml')
const fs = require('fs')

let publicRuntimeConfig = {
  pages: {
    home: {
      title: '',
      heroText: '',
    },
  },
  layout: {
    links: [{ title: '', href: '' }],
    footer: {
      images: [{ name: '', image: '' }],
    },
  },
}

try {
  publicRuntimeConfig = yaml.load(fs.readFileSync('./data/config.yml', 'utf8'))
} catch (e) {
  console.log(e)
}

module.exports = {
  publicRuntimeConfig,
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/map': { page: '/map' },
      '/map/zh-exemple-1': {
        page: '/map/[slug]',
        query: { slug: 'zh-exemple-1' },
      },
      '/map/zh-exemple-2': {
        page: '/map/[slug]',
        query: { slug: 'zh-exemple-2' },
      },
    }
  },
}
