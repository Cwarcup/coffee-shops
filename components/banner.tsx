import styles from "../styles/Banner.module.css"

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
      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <button className={styles.button}>{props.buttonText}</button>
    </div>
  )
}

export default Banner
