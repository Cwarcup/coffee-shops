import { useRouter } from "next/router"

const DynamicRouter = () => {
  const router = useRouter()
  const { dynamic, comment } = router.query

  return (
    <div>
      <h1>Dynamic Router: {dynamic}</h1>
      {comment ? <h2>Comment: {comment}</h2> : null}
    </div>
  )
}

export default DynamicRouter
