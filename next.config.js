const fs = require('fs')
const yaml = require('js-yaml')
const axios = require('axios')
const Pbf = require('pbf')
const geobuf = require('geobuf')

let publicRuntimeConfig = {}

if (fs.existsSync('./data/config.yml')) {
  publicRuntimeConfig = yaml.load(fs.readFileSync('./data/config.yml', 'utf8'))
}

const fetchPBF = async (url) => {
  return await axios.get(url, {
    responseType: 'arraybuffer',
  })
}

const downloadPbf = async () => {
  let existsPBF = false

  try {
    existsPBF = fs.existsSync('./public/geonature.pbf')
  } catch (e) {}

  if (publicRuntimeConfig?.dependencies?.pbf && !existsPBF) {
    const { data, status } = await fetchPBF(
      publicRuntimeConfig?.dependencies?.pbf
    )

    if (status === 200) {
      fs.writeFileSync('./public/geonature.pbf', data)
    }
  }
}

module.exports = {
  publicRuntimeConfig,
  trailingSlash: true,
  exportPathMap: async function () {
    await downloadPbf()
    const pbfData = fs.readFileSync('./public/geonature.pbf')
    const pbf = new Pbf(pbfData)
    const geojson = geobuf.decode(pbf)
    // Treating geojson features since arrays are not well formatted
    // It seems to come from PostGis St_AsGeoBuf...
    geojson.features = geojson.features.map((f) => {
      const { json_arrays, ...properties } = f.properties
      return {
        ...f,
        properties: {
          ...properties,
          ...JSON.parse(json_arrays || '{}'),
        },
      }
    })
    const buffer = geobuf.encode(geojson, new Pbf())
    fs.writeFileSync('./public/geonature.pbf', buffer)

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
