import Head from "next/head"
import styles from "../styles/Home.module.css"
import Image from "next/image"
import heroImage from "../public/static/hero-image.svg"

import Banner from "../components/banner/banner"
import Card from "../components/card/card"

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
          />
        </div>
        <Card
          name="Coffee Shop 1"
          imageURL={heroImage}
          href="/coffee-store/1"
        />
      </main>
    </div>
  )
}
