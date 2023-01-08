import Head from "next/head"
import styles from "../styles/Home.module.css"
import Image from "next/image"
import heroImage from "../public/static/hero-image.svg"

import Banner from "../components/banner/banner"
import Card from "../components/card/card"

type StoreDataTypes = {
  id: number
  name: string
  imgUrl: string
  websiteUrl: string
  address: string
  neighbourhood: string
}

type Props = {
  coffeeStores: StoreDataTypes[]
}

export default function Home({ coffeeStores }: Props = { coffeeStores: [] }) {
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

        {coffeeStores && coffeeStores.length > 0 ? (
          <>
            <h2 className={styles.heading2}>Vancouver Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore: StoreDataTypes) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    websiteUrl={coffeeStore.websiteUrl}
                    address={coffeeStore.address}
                    neighbourhood={coffeeStore.neighbourhood}
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                )
              })}
            </div>
          </>
        ) : null}
      </main>
    </div>
  )
}

// pre-render the coffee store page with getStaticProps
// only runs at build time on the server, NOT client side
export async function getStaticProps() {
  // use coffee-store.json as a mock API, hard coded data
  const coffeeStoresData = await require("../data/coffee-stores.json")

  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  }
}
