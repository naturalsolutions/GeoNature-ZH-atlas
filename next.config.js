const yaml = require('js-yaml')
const fs = require('fs')
const axios = require('axios')

let publicRuntimeConfig = {
  pages: {
    home: {
      title: 'GeoNature Zone Humides · Atlas',
      heroText: '',
      text: [],
      images: [],
    },
  },
  layout: {
    links: [{ title: '', href: '' }],
    header: {
      logo: {
        src: '',
        alt: '',
      },
    },
    footer: {
      images: [{ name: '', image: '' }],
      links: [],
      legal: [],
    },
  },
}

if (fs.existsSync('./data/config.yml')) {
  publicRuntimeConfig = yaml.load(fs.readFileSync('./data/config.yml', 'utf8'))
}

module.exports = {
  publicRuntimeConfig,
  trailingSlash: true,
  exportPathMap: async function () {
    const geojsonData = fs.readFileSync('./public/geonature.geojson')
    let geojson = JSON.parse(geojsonData)

    if (process.env.GEOJSON_URL) {
      const { response, data } = await axios.get(process.env.GEOJSON_URL)

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
