import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import clx from "classnames"
import { BiMap, BiCurrentLocation, BiStar, BiArrowBack } from "react-icons/bi"
import { fetchCoffeeStores } from "../../lib/fetchCoffeeStores"
import styles from "../../styles/coffee-store.module.css"
import type { FetchCoffeeResponseType } from "../../lib/fetchCoffeeStores"

const CoffeeStore = ({
  coffeeStore,
}: {
  coffeeStore: FetchCoffeeResponseType
}) => {
  const { id, name, location, geocodes, distance, imgUrl } = coffeeStore

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
            <Link
              href="/"
              scroll={false}
              className={styles.backToHomeContainer}
            >
              <BiArrowBack className={styles.backToHomeArrow} />
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
            <p className={styles.text}>
              {location.address} {location.postcode}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <BiCurrentLocation className={styles.icon} />
            <p className={styles.text}>{location.neighborhood}</p>
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
export async function getStaticProps({ params }: { params: { id: string } }) {
  // need to use the id from the URL to find the coffee store
  const { id } = params

  const coffeeStoresData = await fetchCoffeeStores()

  // find the coffee store with the id from the URL
  const coffeeStore = coffeeStoresData.find(
    (coffeeStore: FetchCoffeeResponseType) => coffeeStore.id === id
  )

  return {
    props: {
      coffeeStore,
    },
  }
}

// * generate coffee-store/[id].tsx page for each coffee store
export async function getStaticPaths() {
  const coffeeStoresData = await fetchCoffeeStores()

  const paths = coffeeStoresData.map((coffeeStore: FetchCoffeeResponseType) => {
    return {
      params: {
        id: coffeeStore.id,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}
