import { useState } from "react"

type PositionType = {
  coords: {
    latitude: number
    longitude: number
  }
}

// custom hook to get user location
const useUserLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("")
  const [latLong, setLatLong] = useState("")
  const [isFindingLocation, setIsFindingLocation] = useState(false)

  const success = (position: PositionType) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    setLatLong(`${latitude},${longitude}`)
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
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return {
    latLong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  }
}

export default useUserLocation
