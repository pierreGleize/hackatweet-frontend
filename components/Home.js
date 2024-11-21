import styles from "../styles/Home.module.css";
import Login from "./Login";
import Tweet from "./Tweet";

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.leftSection}>
        <img className={styles.leftTwitterLogo} src="/twitter.png"></img>
        <div className={styles.userSection}>
          <img className={styles.userLogo} src="/userIcon.png"></img>
          <div className={styles.userInfos}>
            <h3 className={styles.userFirstName}>Thomas</h3>
            <span className={styles.username}>@thomasLebel</span>
          </div>
        </div>
      </section>

      <section className={styles.middleSection}>
        <h2 className={styles.title}>Home</h2>
        <input placeholder="What's up?" className={styles.input}></input>
        <div className={styles.tweetSection}>
          <span className={styles.letterCounter}>0/280</span>
          <button className={styles.tweetButton}>Tweet</button>
        </div>
        <Tweet />
        <Tweet />
      </section>

      <section className={styles.rightSection}></section>
    </div>
  );
}

export default Home;
