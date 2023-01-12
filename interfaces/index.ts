// type of mutated data response from FourSquare API and Unsplash
export type CoffeeResType = {
  id: string
  name: string
  location: {
    address: string
    neighborhood: string[]
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

// type of raw data response from FourSquare API
export type FoursquareResult = {
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
