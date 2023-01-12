import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import clx from "classnames"
import { useRouter } from "next/router"
import useSWR from "swr"
import { BiMap, BiCurrentLocation, BiStar, BiArrowBack } from "react-icons/bi"
import { fetchCoffeeStores } from "../../lib/fetchCoffeeStores"
import styles from "../../styles/coffee-store.module.css"
import type { CoffeeResType, AirtableReqBody } from "../../interfaces"
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

  const [votingCount, setVotingCount] = useState<number>(0)

  // * source of truth for the coffee stores
  const [store, setStore] = useState<CoffeeResType | null>(
    initialProps?.coffeeStore || null
  )

  // create coffee store in airtable db if this is a new coffee store
  const handleCreateCoffeeStore = async (coffeeStore: CoffeeResType) => {
    console.log("Creating coffee")
    console.log(coffeeStore)
    try {
      const {
        id,
        name,
        location: { address, neighborhood, cross_street, postcode },
        geocodes: { lat, lng },
        distance,
        imgUrl,
      } = coffeeStore

      const res = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          address: address || "",
          neighborhood: neighborhood[0],
          cross_street: cross_street || "",
          postcode: postcode || "",
          lat: lat || 0,
          lng: lng || 0,
          distance: distance || 0,
          imgUrl: imgUrl || "",
        } as AirtableReqBody),
      })

      const dbCoffeeStore = await res.json()
    } catch (error) {
      console.error("Error creating coffee store", error)
    }
  }

  useEffect(() => {
    // if the initialProps does not match a static path, then use the context to set the store state
    if (initialProps?.coffeeStore === null) {
      const getStore = state.coffeeStores?.find(
        (store) => store.id === id
      ) as CoffeeResType

      setStore(getStore)
      handleCreateCoffeeStore(getStore)
    } else {
      // create the coffee store from static site generation (build time)
      handleCreateCoffeeStore(initialProps?.coffeeStore as CoffeeResType)
    }
  }, [initialProps, id, state.coffeeStores, initialProps?.coffeeStore])

  const handleUpvoteClick = () => {
    console.log("Upvote clicked!")
    let newVotingCount = votingCount + 1
    setVotingCount(newVotingCount)
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR(
    `/api/getCoffeeStoresById?id=${id}`,
    fetcher
  ) as {
    data: AirtableReqBody[]
    error: any
  }

  // useEffect to handle the vote
  useEffect(() => {
    // onn load, make a request to /api/getCoffeeStoreById to get the voting count
    if (data && data.length > 0) {
      setVotingCount(data[0].voting)
    }
  }, [data])

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
            <p className={styles.text}>{votingCount}</p>
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
