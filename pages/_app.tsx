import "../styles/globals.css"
import type { AppProps } from "next/app"
import styles from "../styles/Home.module.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <footer className={styles.footer}>
        <div className="center">
          <p>
            <strong>Next.js</strong> by <a href="cwarcup.com">Curtis Warcup</a>
          </p>
        </div>
      </footer>
    </>
  )
}
