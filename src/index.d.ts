export interface Image {
  label: string
  imgPath: string
}

export interface ZoneHumide {
  nom: string
  slug: string
  code: string
  date: Date
  type: string
  type_code: number
  bassin_versant: string[]
  superficie: number
  operateur: string
  menaces: string
  diagnostic_bio: string
  criteres_delim: string[]
  images: Image[]
}
