const yaml = require('js-yaml')
const fs = require('fs')

const geojson = {
  features: [],
}

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

const routes = geojson.features.reduce((acc, value) => {
  acc[`/map/${value.properties.slug}`] = {
    page: '/map/[slug]',
    query: {
      slug: value.properties.slug,
    },
  }

  return acc
}, {})

module.exports = {
  publicRuntimeConfig,
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/map': { page: '/map' },
      ...routes,
    }
  },
}
