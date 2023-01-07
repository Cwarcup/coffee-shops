import Image from "next/image"
import Link from "next/link"

type Props = {
  name: string
  imageURL: string
  href: string
}

const Card = (props: Props) => {
  return (
    <>
      <Link href={props.href}>
        <h2>{props.name}</h2>
        <Image
          src={props.imageURL}
          alt="Coffee Shop Image"
          width={260}
          height={260}
        />
      </Link>
    </>
  )
}

export default Card
