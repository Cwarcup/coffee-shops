import { fetchCoffeePhotos } from "./fetchCoffeePhotos"
import type { CoffeeResType, FoursquareResult } from "../interfaces"

type Query = {
  query: string
  LatLong: string
  limit: string
}
// latLong format: "49.170128,-123.182828"
// getUrlForCoffeeStores is a function that returns a url for fetching coffee stores
const getUrlForCoffeeStores = (query: Query) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${
    query.query
  }&ll=${query.LatLong}&sort=DISTANCE&limit=${query.limit.toString()}`
  return url
}

// fetchCoffeeStores is a function that fetches coffee stores from Foursquare API
export const fetchCoffeeStores = async (
  LatLong = "49.2745606,-123.1240756",
  limit = "6"
): Promise<CoffeeResType[]> => {
  // use Foursquare API to fetch coffee stores
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
    },
  }

  const response = await fetch(
    getUrlForCoffeeStores({
      query: "coffee",
      LatLong: LatLong,
      limit: limit,
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
        neighborhood: result.location?.neighborhood ?? [""],
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
