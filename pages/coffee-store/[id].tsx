import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import clx from "classnames"

import type { FoursquareResult } from "../index"
import { BiMap, BiCurrentLocation, BiStar } from "react-icons/bi"

import styles from "../../styles/coffee-store.module.css"

type Props = {
  name: string
  imgUrl: string
  address?: string
  neighbourhood?: string
  href: string
  className?: string
  coffeeStore: FoursquareResult
}

const CoffeeStore = (props: Props) => {
  const {
    coffeeStore: { name, location, categories, geocodes },
  } = props

  const handleUpvoteClick = () => {
    console.log("Upvote clicked!")
  }

  const imgUrl =
    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`Coffee Critic - ${name}`} />
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/" scroll={false}>
              Back to home
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            alt={name}
            width={500}
            height={500}
            className={styles.storeImg}
          />
        </div>
        <div className={clx("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <BiMap className={styles.icon} />
            <p className={styles.text}>{location.formatted_address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <BiCurrentLocation className={styles.icon} />
            <p className={styles.text}>{location.neighborhood[0]}</p>
          </div>
          <div className={styles.iconWrapper}>
            <BiStar className={styles.icon} />
            <p className={styles.text}>{1}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteClick}>
            Upvote
          </button>
        </div>
      </div>
    </>
  )
}
export default CoffeeStore

// *  must pass the params object to getStaticProps
export async function getStaticProps(staticProps: any) {
  // need to use the id from the URL to find the coffee store

  const { id } = staticProps.params

  // get the coffee stores data
  // use Foursquare API to fetch coffee stores
  async function fetchCoffeeStores() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "fsq3VK7cEHfTEPInVt3TsaDFX+6jbmYFQY+jwZfltmm4W3w=",
      },
    }

    const response = await fetch(
      "https://api.foursquare.com/v3/places/search?query=coffee&ll=49.1603536%2C-123.1845473&sort=RATING&limit=6",
      options
    )
    const data = await response.json()

    return data
  }

  const coffeeStoresData = await fetchCoffeeStores()

  // find the coffee store with the id from the URL
  const coffeeStore: FoursquareResult = coffeeStoresData.results.find(
    (coffeeStore: FoursquareResult) => coffeeStore.fsq_id === id
  )

  return {
    props: {
      coffeeStore,
    },
  }
}

// * generate coffee-store/[id].tsx page for each coffee store
export async function getStaticPaths() {
  // use Foursquare API to fetch coffee stores
  async function fetchCoffeeStores() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "fsq3VK7cEHfTEPInVt3TsaDFX+6jbmYFQY+jwZfltmm4W3w=",
      },
    }

    const response = await fetch(
      "https://api.foursquare.com/v3/places/search?query=coffee&ll=49.1603536%2C-123.1845473&sort=RATING&limit=6",
      options
    )
    const data = await response.json()

    return data
  }

  const coffeeStoresData = await fetchCoffeeStores()

  const paths = coffeeStoresData.results.map(
    (coffeeStore: FoursquareResult) => {
      return {
        params: {
          id: coffeeStore.fsq_id,
        },
      }
    }
  )
  return {
    paths,
    fallback: false,
  }
}
