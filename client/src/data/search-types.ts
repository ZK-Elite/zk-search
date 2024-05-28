interface QueryTypes {
  title: string;
  href: string;
  body: string;
}

interface SuggestTypes {
  phrase: string;
}

interface ImageTypes {
  title: string
  image: string
  thumbnail: string
  url: string
  height: number
  width: number
  source: string
}

interface VideoTypes {
  content: string
  description: string
  duration: string,
  embed_html: string
  embed_url: string
  image_token: string
  images: VideoImages
  provider: string
  published: string
  publisher: string
  statistics: StatisticsTypes
  title: string
  uploader: string
}

interface VideoImages {
  large: string
  medium: string
  motion: string
  small: string
}

interface StatisticsTypes {
  viewCount: number
}

interface NewsTypes {
  date: string
  title: string
  body: string
  url: string
  image: string
  source: string
}

export type { QueryTypes, SuggestTypes, ImageTypes, VideoTypes, NewsTypes };