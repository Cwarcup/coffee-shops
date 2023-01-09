import Image from "next/image"
import Link from "next/link"
import cls from "classnames"

import styles from "./card.module.css"

type Props = {
  key: string
  name: string
  imgUrl?: string
  address?: string
  neighbourhood?: string
  href: string
  className?: string
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
              src={
                props.imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
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
