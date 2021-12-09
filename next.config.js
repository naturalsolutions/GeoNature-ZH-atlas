const fs = require('fs')
const yaml = require('js-yaml')
const axios = require('axios')

let publicRuntimeConfig = {}

if (fs.existsSync('./data/config.yml')) {
  publicRuntimeConfig = yaml.load(fs.readFileSync('./data/config.yml', 'utf8'))
}

module.exports = {
  publicRuntimeConfig,
  trailingSlash: true,
  exportPathMap: async function () {
    const geojsonData = fs.readFileSync('./public/geonature.geojson')
    let geojson = JSON.parse(geojsonData)

    if (publicRuntimeConfig?.dependencies?.geojson) {
      const { response, data } = await axios.get(
        publicRuntimeConfig.dependencies.geojson
      )

      if (response === 200) {
        geojson = data
      }
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

    return {
      '/': { page: '/' },
      '/map': { page: '/map' },
      ...routes,
    }
  },
}
