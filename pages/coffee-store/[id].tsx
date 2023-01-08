import Link from "next/link"
import Image from "next/image"
import Head from "next/head"

import type { StoreDataTypes } from "../index"

type Props = {
  coffeeStore: StoreDataTypes
}

const CoffeeStore = ({ coffeeStore }: Props) => {
  const { name, imgUrl, websiteUrl, address, neighbourhood } = coffeeStore

  console.log("coffeeStore", coffeeStore)

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`Coffee Critic - ${name}`} />
      </Head>
      <h1>{}</h1>
      <Link href="/" scroll={false}>
        Back to home
      </Link>
      <h1>{name}</h1>
      <Image src={imgUrl} alt={name} width={500} height={500} />
      <p>
        <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
          {websiteUrl}
        </a>
      </p>
      <p>{address}</p>
      <p>{neighbourhood}</p>
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
