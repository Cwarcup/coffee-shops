import "../styles/globals.css"
import type { AppProps } from "next/app"
import { IBM_Plex_Sans } from "@next/font/google"

const ibm_plex_sans = IBM_Plex_Sans({
  weight: ["500", "600", "700"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${ibm_plex_sans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
