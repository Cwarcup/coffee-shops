// make a fetch request to unsplash api

export type UnsplashImage = {
  id: string
  created_at: string
  updated_at: string
  promoted_at: string
  width: number
  height: number
  color: string
  blur_hash: string
  description: string
  alt_description: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
    small_s3: string
  }
}

export const fetchCoffeePhotos = async (): Promise<string[]> => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=coffee%20shops&per_page=30`,
    options
  )
  const data = await response.json()
  return data.results.map((photo: UnsplashImage) => photo.urls["small"])
}
