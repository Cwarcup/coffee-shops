import styles from "./banner.module.css"

type Props = {
  buttonText: string
  handleOnClick?: () => void
}

const Banner = (props: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Critic</span>
      </h1>

      <p className={styles.subTitle}>Discover your local coffee shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button}>{props.buttonText}</button>
      </div>
    </div>
  )
}

export default Banner
