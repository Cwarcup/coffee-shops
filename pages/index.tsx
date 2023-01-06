import Head from "next/head"

import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.css"

import Banner from "../components/banner"

export default function Home() {
  const handleOnButtonClick = () => {
    console.log("Button clicked!")
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Critic</title>
        <meta
          name="description"
          content="Discover local coffee shops in your area!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <Banner
          buttonText="View shops near me"
          handleOnClick={handleOnButtonClick}
        />
      </main>
    </div>
  )
}
