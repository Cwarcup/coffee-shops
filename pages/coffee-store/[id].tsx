import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import clx from "classnames"
import { useRouter } from "next/router"
import { BiMap, BiCurrentLocation, BiStar, BiArrowBack } from "react-icons/bi"
import { fetchCoffeeStores } from "../../lib/fetchCoffeeStores"
import styles from "../../styles/coffee-store.module.css"
import type { CoffeeResType } from "../../interfaces"
import { useEffect, useState, useContext } from "react"
import { StoreContext } from "../../context/store-context"

type InitialPropsType = {
  coffeeStore: CoffeeResType
} | null

const CoffeeStore = (initialProps: InitialPropsType) => {
  const router = useRouter()
  const id = router.query.id // id from the URL to identify the coffee store.

  // context state,
  const { state } = useContext(StoreContext)

  // * source of truth for the coffee stores
  const [store, setStore] = useState<CoffeeResType | null>(null)

  useEffect(() => {
    // if the initialProps does not match a static path, then use the context to set the store state
    if (initialProps?.coffeeStore === null) {
      const getStore = state.coffeeStores?.find(
        (store) => store.id === id
      ) as CoffeeResType
      setStore(getStore)
    } else {
      // if the initialProps matches a static path, then use the initialProps to set the store state
      if (initialProps?.coffeeStore) {
        setStore(initialProps.coffeeStore)
      }
    }
  }, [initialProps, id, state.coffeeStores])

  const handleUpvoteClick = () => {
    console.log("Upvote clicked!")
  }

  if (!store) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>{store.name}</title>
        <meta name="description" content={`Coffee Critic - ${store.name}`} />
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
            <h1 className={styles.name}>{store.name}</h1>
          </div>
          <Image
            src={store.imgUrl}
            alt={store.name}
            width={500}
            height={500}
            className={styles.storeImg}
          />
        </div>
        <div className={clx("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <BiMap className={styles.icon} />
            <p className={styles.text}>
              {store.location.address} {store.location.postcode}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <BiCurrentLocation className={styles.icon} />
            <p className={styles.text}>{store.location.neighborhood}</p>
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
  const findCoffeeStoreById =
    coffeeStoresData.find(
      (coffeeStore: CoffeeResType) => coffeeStore.id === id
    ) || null

  return {
    props: {
      coffeeStore: findCoffeeStoreById,
    },
  }
}

// * generate coffee-store/[id].tsx page for each coffee store
export async function getStaticPaths() {
  const coffeeStoresData = await fetchCoffeeStores()

  const paths = coffeeStoresData.map((coffeeStore: CoffeeResType) => {
    return {
      params: {
        id: coffeeStore.id,
      },
    }
  })
  return {
    paths,
    fallback: true,
  }
}
