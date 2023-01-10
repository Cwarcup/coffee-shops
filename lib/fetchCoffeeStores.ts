import { FoursquareResult } from "../pages/index"

type FoursquareResponse = {
  results: FoursquareResult[]
  content: any
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

export const fetchCoffeeStores = async (): Promise<FoursquareResult[]> => {
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
      limit: 10,
    }),
    options
  )
  const data: FoursquareResponse = await response.json()

  return data.results
}
