module.exports = {
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
