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
}

const CoffeeStore = (props: Props) => {
  const { name, imgUrl, address, neighbourhood } = props

  const handleUpvoteClick = () => {
    console.log("Upvote clicked!")
  }

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
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <BiCurrentLocation className={styles.icon} />
            <p className={styles.text}>{neighbourhood}</p>
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
  const coffeeStoresData = await require("../../data/coffee-stores.json")

  // find the coffee store with the id from the URL
  const coffeeStore: StoreDataTypes = coffeeStoresData.find(
    (coffeeStore: StoreDataTypes) => coffeeStore.id === parseInt(id)
  )

  return {
    props: {
      coffeeStore,
    },
  }
}

// * generate coffee-store/[id].tsx page for each coffee store
export async function getStaticPaths() {
  const coffeeStoresData = await require("../../data/coffee-stores.json")

  const paths = coffeeStoresData.map((coffeeStore: StoreDataTypes) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}
