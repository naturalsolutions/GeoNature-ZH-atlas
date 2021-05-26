const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // Following line is to let NextJS know about its domain on specific case:
  // 1. Project page : assetPrefix should be your project name (production only)
  // 2. User or Group page : assetPrefix should not be set, or just '/' (production only)
  assetPrefix: isProd ? '/geonature-atlas/' : '',
}
