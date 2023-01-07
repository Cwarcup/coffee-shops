import { useRouter } from "next/router"
import Head from "next/head"

const DynamicRouter = () => {
  const router = useRouter()
  const { dynamic, comment } = router.query

  console.log(router?.query)

  return (
    <>
      <Head>
        <title>
          {dynamic ? `Dynamic Router: ${dynamic}` : "Dynamic Router"}
        </title>
      </Head>
      <div>
        <h1>Dynamic Router: {dynamic}</h1>
        {comment ? <h2>Comment: {comment}</h2> : null}
      </div>
    </>
  )
}

export default DynamicRouter
