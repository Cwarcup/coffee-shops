import Image from "next/image"
import Link from "next/link"
import cls from "classnames"

import styles from "./card.module.css"

type Props = {
  name: string
  imageURL: string
  href: string
}

const Card = (props: Props) => {
  return (
    <>
      <Link href={props.href} className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imageURL}
              alt="Coffee Shop Image"
              width={260}
              height={260}
            />
          </div>
        </div>
      </Link>
    </>
  )
}

export default Card
