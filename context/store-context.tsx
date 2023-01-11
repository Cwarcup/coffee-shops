import { createContext, useReducer } from "react"

import type { CoffeeResType } from "../lib/fetchCoffeeStores"

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
}

type StoreContextType = {
  state: {
    latLong: string
    coffeeStores: CoffeeResType[]
  }
  dispatch: (action: any) => void
} | null

export const StoreContext = createContext<StoreContextType>(null)

const storeReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong }
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const StoreProvider = ({ children }: { children: any }) => {
  const initialState = {
    latLong: "49.282622,-123.118382",
    coffeeStores: [
      {
        id: "4aae9450f964a5207e6220e3",
        name: "Nespresso Boutique",
        location: {
          address: "674 Granville St",
          neighborhood: ["Downtown"],
          cross_street: "at Georgia St",
          postcode: "V6C 1Z6",
        },
        geocodes: { lat: 49.282871, lng: -123.117714 },
        distance: 52,
        imgUrl:
          "https://images.unsplash.com/photo-1617943750033-c450aa16e724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTc3NDh8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wc3xlbnwwfHx8fDE2NzMzODY2NDY&ixlib=rb-4.0.3&q=80&w=400",
      },
    ],
  }

  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
