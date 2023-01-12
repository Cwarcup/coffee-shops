import { createContext, useReducer } from "react"
import type { CoffeeResType } from "../interfaces"

// define the action types
enum ACTION_TYPES {
  SET_LAT_LONG = "SET_LAT_LONG",
  SET_COFFEE_STORES = "SET_COFFEE_STORES",
}

// functions to update the latLong state
// import this and the dispatch function to update the state
export const setLatLong = (latLong: string) => ({
  type: ACTION_TYPES.SET_LAT_LONG,
  payload: { latLong },
})

// functions to update the coffeeStores state
// import this and the dispatch function to update the state
// e.g.,  dispatch(setCoffeeStores(getNearbyStores))
export const setCoffeeStores = (coffeeStores: CoffeeResType[]) => ({
  type: ACTION_TYPES.SET_COFFEE_STORES,
  payload: { coffeeStores },
})

// types for the context, all state as null
type StoreContextType = {
  state: {
    latLong: string | null
    coffeeStores: CoffeeResType[] | null
  }
  dispatch: (action: any) => void
}

const initialState = {
  latLong: null,
  coffeeStores: null,
}

// context to store the state
export const StoreContext = createContext<StoreContextType>({
  state: initialState,
  dispatch: () => null,
})

// reducer function to update the state
const storeReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      // update the latLong in the state
      return { ...state, latLong: action.payload.latLong }

    case ACTION_TYPES.SET_COFFEE_STORES:
      // update the coffeeStores array in the state
      return { ...state, coffeeStores: action.payload.coffeeStores }

    default:
      return state
  }
}

// provider component to wrap the app
const StoreProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
