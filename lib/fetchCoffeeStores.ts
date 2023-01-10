import { FoursquareResult } from "../pages/index"

export const fetchCoffeeStores = async (): Promise<FoursquareResult[]> => {
  // use coffee-store.json as a mock API, hard coded data
  // const coffeeStoresData = await require("../data/coffee-stores.json")

  // use Foursquare API to fetch coffee stores

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.FOURSQUARE_API_KEY}`,
    },
  }

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=coffee&ll=49.170128%2C-123.182828&sort=DISTANCE&limit=6",
    options
  )
  const data = await response.json()

  return data.results
}
