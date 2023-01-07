import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import Image from "next/image"

import Banner from "../components/banner"
import heroImage from "../public/static/hero-image.svg"

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
      <main className={styles.main}>
        <Banner
          buttonText="View shops near me"
          handleOnClick={handleOnButtonClick}
        />
        <div className={styles.heroImage}>
          <Image src={heroImage} alt="Coffee cup" />
        </div>
      </main>
    </div>
  )
}
