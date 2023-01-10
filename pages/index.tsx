import Head from "next/head"
import styles from "../styles/Home.module.css"
import Image from "next/image"
import { fetchCoffeeStores } from "../lib/fetchCoffeeStores"
import type { FetchCoffeeResponseType } from "../lib/fetchCoffeeStores"

import useUserLocation from "../hooks/useUserLocation"

import heroImage from "../public/static/hero-image.svg"
import Banner from "../components/banner/banner"
import Card from "../components/card/card"

export default function Home({
  coffeeStores,
}: {
  coffeeStores: FetchCoffeeResponseType[]
}) {
  const { latLong, handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useUserLocation()

  const handleOnButtonClick = () => {
    handleTrackLocation()
  }

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
            src={heroImage}
            alt="Coffee Cup Hero Image"
            width={500}
            height={500}
            priority
          />
        </div>

        {coffeeStores ? (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Richmond Stores</h2>
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
  const coffeeStoresData = await fetchCoffeeStores()

  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  }
}
