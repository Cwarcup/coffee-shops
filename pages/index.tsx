import Head from "next/head"
import styles from "../styles/Home.module.css"
import Image from "next/image"
import { fetchCoffeeStores } from "../lib/fetchCoffeeStores"

import heroImage from "../public/static/hero-image.svg"
import Banner from "../components/banner/banner"
import Card from "../components/card/card"

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
}

export default function Home({
  coffeeStores,
}: {
  coffeeStores: FoursquareResult[]
}) {
  console.log(coffeeStores)
  const handleOnButtonClick = () => {
    console.log("Button clicked!")
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
          buttonText="View shops near me"
          handleOnClick={handleOnButtonClick}
        />
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
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgUrl={
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
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

// pre-render the coffee store page with getStaticProps
// only runs at build time on the server, NOT client side
export async function getStaticProps() {
  const coffeeStoresData = await fetchCoffeeStores()

  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  }
}
