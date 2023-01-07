import { useRouter } from "next/router"
import Link from "next/link"

const CoffeeStore = () => {
  // use the useRouter hook to get the id from the URL
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Store {id}</h1>
      <Link href="/" scroll={false}>
        Back to home
      </Link>
    </div>
  )
}

export default CoffeeStore
