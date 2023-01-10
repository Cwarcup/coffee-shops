import { fetchCoffeePhotos } from "./fetchCoffeePhotos"

// type of raw data response from FourSquare API
type FoursquareResult = {
  fsq_id: string
  categories: Array<{
    id: number
    name: string
    icon: {
      prefix: string
      suffix: string
    }
  }>
  chains: any[]
  distance: number
  geocodes: {
    main: {
      latitude: number
      longitude: number
    }
    roof: {
      latitude: number
      longitude: number
    }
  }
  link: string
  location: {
    address: string
    country: string
    cross_street: string
    formatted_address: string
    locality: string
    neighborhood: string[]
    postcode: string
    region: string
  }
  name: string
  related_places: any
  timezone: string
  imgUrl?: string
}

// type of mutated data response from FourSquare API and Unsplash
export type FetchCoffeeResponseType = {
  id: string
  name: string
  location: {
    address: string
    neighborhood: string
    cross_street: string
    postcode: string
  }
  geocodes: {
    lat: number
    lng: number
  }
  distance: number
  imgUrl: string
}

type Query = {
  query: string
  LatLong: string
  limit: number
}
// latLong format: "49.170128,-123.182828"
const getUrlForCoffeeStores = (query: Query) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${
    query.query
  }&ll=${query.LatLong}&sort=DISTANCE&limit=${query.limit.toString()}`
  return url
}

export const fetchCoffeeStores = async (): Promise<
  FetchCoffeeResponseType[]
> => {
  // use Foursquare API to fetch coffee stores
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.FOURSQUARE_API_KEY}`,
    },
  }

  const response = await fetch(
    getUrlForCoffeeStores({
      query: "coffee",
      LatLong: "49.17,-123.18",
      limit: 6,
    }),
    options
  )
  const data = await response.json()

  const photos = await fetchCoffeePhotos()

  return data.results.map((result: FoursquareResult, index: number) => {
    return {
      id: result.fsq_id,
      name: result.name,
      location: {
        address: result.location?.address ?? "",
        neighborhood: result.location?.neighborhood ?? "",
        cross_street: result.location?.cross_street ?? "",
        postcode: result.location?.postcode ?? "",
      },
      geocodes: {
        lat: result.geocodes.main.latitude,
        lng: result.geocodes.main.longitude,
      },
      distance: result.distance,
      imgUrl: photos[index],
    }
  })
}
