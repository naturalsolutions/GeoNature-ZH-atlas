const yaml = require('js-yaml')
const fs = require('fs')
const axios = require('axios')

if (!process.env.GEOJSON_URL) {
  throw new Error('GEOJSON_URL is mandatory')
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

module.exports = {
  publicRuntimeConfig,
  trailingSlash: true,
  exportPathMap: async function () {
    const { data: geojson } = await axios.get(process.env.GEOJSON_URL)
    const routes = geojson.features.reduce((acc, value) => {
      acc[`/map/${value.properties.slug}`] = {
        page: '/map/[slug]',
        query: {
          slug: value.properties.slug,
        },
      }

      return acc
    }, {})

    return {
      '/': { page: '/' },
      '/map': { page: '/map' },
      ...routes,
    }
  },
}
