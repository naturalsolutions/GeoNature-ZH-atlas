export const TYPES_COLORS = {
  1: '#1945ce',
  2: '#c900f2',
  3: '#7c4f24',
  4: '#565674',
  5: '#227147',
  6: '#2e948e',
  7: '#56e9e4',
  8: '#b1e993',
  9: '#c5c551',
  10: '#94a178',
  11: '#00a4a6',
  12: '#af851a',
  13: '#019875',
}

export const TYPES = {
  1: 'grands estuaires',
  2: 'baies et estuaires moyens-plats',
  3: 'marais et lagunes côtiers',
  4: 'marais saumâtres aménagés',
  5: "bordures de cours d'eau",
  6: 'plaines alluviales',
  7: 'zones humides de bas fonds en tête de bassin',
  8: "régions d'étangs",
  9: "petits plans d'eau et bordures de plans d'eau",
  10: ' marais et landes humides de plaines et plateaux',
  11: ' zones humides ponctuelles',
  12: ' marais aménagés dans un but agricole',
  13: ' zones humides artificielles',
}

export const MAP_CENTER = [47.8, 2.6]

export const TILE_LAYERS = [
  {
    checked: false,
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png	',
    name: 'OpenStreetMap',
    attribution: '&copy OpenStreetMap',
    subdomains: [],
  },
  {
    checked: true,
    url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
    name: 'OpenTopoMap',
    attribution: '© OpenTopoMap',
    subdomains: [],
  },
  {
    checked: false,
    url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    name: 'GoogleSatellite',
    attribution: '© GoogleMap',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  },
]
