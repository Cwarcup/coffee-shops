import { useState, useContext } from "react"
import { setLatLong, StoreContext } from "../context/store-context"

type PositionType = {
  coords: {
    latitude: number
    longitude: number
  }
}

// custom hook to get user location
const useUserLocation = () => {
  const { dispatch } = useContext(StoreContext)

  const [locationErrorMsg, setLocationErrorMsg] = useState("")

  const [isFindingLocation, setIsFindingLocation] = useState(false)

  const success = (position: PositionType) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    dispatch(setLatLong(`${latitude},${longitude}`))
    setLocationErrorMsg("")
    setIsFindingLocation(false)
  }

  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location")
  }

  const handleTrackLocation = () => {
    setIsFindingLocation(true)

    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser")
      setIsFindingLocation(false)
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return {
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  }
}

export default useUserLocation
