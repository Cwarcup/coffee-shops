import Head from "next/head"
import Image from "next/image"
import { useEffect, useState, useContext } from "react"
import { fetchCoffeeStores } from "../lib/fetchCoffeeStores"
import type { CoffeeResType } from "../interfaces"

import useUserLocation from "../hooks/useUserLocation"

import styles from "../styles/Home.module.css"
import Banner from "../components/banner/banner"
import Card from "../components/card/card"
import { StoreContext, setCoffeeStores } from "../context/store-context"

export default function Home({
  coffeeStores,
}: {
  coffeeStores: CoffeeResType[]
}) {
  // custom hook to get the user's location
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useUserLocation()

  // error message for fetching coffee stores
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleOnButtonClick = () => {
    handleTrackLocation()
  }

  // use the context to get the latLong and coffeeStores
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    // fetch the coffee stores by location
    async function setCoffeeStoresByLocation() {
      if (state.latLong) {
        try {
          // make a request to our internal server
          const getNearbyStores = await fetch(
            `api/getCoffeeStoresByLocation?latLong=${state.latLong}&limit=6`
          ).then((res) => res.json())

          // update the coffeeStores in the context with nearby stores
          dispatch(setCoffeeStores(getNearbyStores))
        } catch (error) {
          console.log(error)
          setErrorMsg("Error fetching coffee stores")
        }
      }
    }

    setCoffeeStoresByLocation()
  }, [state.latLong, dispatch])

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Critic</title>
        <meta
          name="description"
          content="Discover local coffee shops in your area! "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "locating..." : "Find my location"}
          handleOnClick={handleOnButtonClick}
        />
        {locationErrorMsg ? (
          <p className={styles.locationErrorMsg}>{locationErrorMsg}</p>
        ) : null}

        <div className={styles.heroImage}>
          <Image
            // src={heroImage}
            src="/static/hero-image.svg"
            alt="Coffee Cup Hero Image"
            width={800}
            height={343}
            priority
          />
        </div>

        {state.coffeeStores ? (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {state.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                )
              })}
            </div>
          </div>
        ) : null}

        {errorMsg ? <p className={styles.errorMsg}>{errorMsg}</p> : null}

        {coffeeStores ? (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Vancouver Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                )
              })}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}

// * pre-render the coffee store page with getStaticProps
// * only runs at build time on the server, NOT client side
export async function getStaticProps() {
  //! do not make internal API requests here. The server may not be spun up yet at the time of build
  const coffeeStoresData = await fetchCoffeeStores()

  // DO NOT DO THIS
  // const getNearbyStores = await fetch(
  //   `api/getCoffeeStoresByLocation?latLong=42,123&limit=6`
  // ).then((res) => res.json())

  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  }
}
