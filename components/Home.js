import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Link from 'next/link';

function Home() {

  const [tweetMessage, setTweetMessage] = useState('')
  const [counter, setCounter] = useState(0)


  function createMessage(e){
    const input = e.target.value
    if (input.length <= 280){
      setTweetMessage(input)
      setCounter(input.length)
    }
  }

  return (
    <div className={styles.home}>

      <section className={styles.leftSection}>
      <Link href="/homepage"><img className={styles.leftTwitterLogo} src='/twitter.png'></img></Link>
        <div className={styles.userDiv}>
          <div className={styles.userSection}>
            <img className={styles.userLogo} src='/userIcon.png'></img>
            <div className={styles.userInfos}>
              <h3 className={styles.userFirstName}>Thomas</h3>
              <span className={styles.username}>@thomasLebel</span>
            </div>
          </div>
          <button className={styles.logout}>Logout</button>
        </div>
      </section>

      <section className={styles.middleSection}>
        <h2 className={styles.title}>Home</h2>
        <textarea  value={tweetMessage} onChange={(e) => createMessage(e)} type="text"placeholder="What's up?" className={styles.input}></textarea>
        <div className={styles.tweetSection}>
          <span className={styles.letterCounter}>{counter}/280</span>
          <button className={styles.tweetButton}>Tweet</button>
        </div>
      </section>

      <section className={styles.rightSection}>
        <h2 className={styles.title}>Trends</h2>
        <div className={styles.trendsSection}>

          <div className={styles.trend}>
            <h3 className={styles.hashtag}>#hackatweet</h3>
            <p className={styles.tweetsNumber}>2 Tweets</p>
          </div>

          <div className={styles.trend}>
            <h3 className={styles.hashtag}>#hackatweet</h3>
            <p className={styles.tweetsNumber}>2 Tweets</p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;
