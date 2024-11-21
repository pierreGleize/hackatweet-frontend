import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Tweet from "./Tweet";

function Home() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [tweetsData, setTweetsData] = useState([]);
  const [lastTweet, setLastTweet] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setLastTweet(data.tweets[data.tweets.length - 1]);
          setTweetsData(data.tweets.slice(0, data.tweets.length - 1));
        }
      });
  }, []);

  function createMessage(e) {
    const input = e.target.value;
    if (input.length <= 280) {
      setTweetMessage(input);
      setCounter(input.length);
    }
  }

  const tweets = tweetsData.map((element, i) => (
    <Tweet
      key={i}
      date={element.date}
      message={element.message}
      like={element.like.length}
      avatar={element.user.avatar}
      firstname={element.user.firstName}
      username={element.user.username}
    />
  ));
  // console.log(tweets);

  return (
    <div className={styles.home}>
      <section className={styles.leftSection}>
        <Link href="/homepage">
          <img className={styles.leftTwitterLogo} src="/twitter.png"></img>
        </Link>
        <div className={styles.userSection}>
          <img className={styles.userLogo} src="/userIcon.png"></img>
          <div className={styles.userInfos}>
            <h3 className={styles.userFirstName}>Thomas</h3>
            <span className={styles.username}>@thomasLebel</span>
          </div>
          <button className={styles.logout}>Logout</button>
        </div>
      </section>

      <section className={styles.middleSection}>
        <h2 className={styles.title}>Home</h2>
        <textarea
          value={tweetMessage}
          onChange={(e) => createMessage(e)}
          type="text"
          placeholder="What's up?"
          className={styles.input}
        ></textarea>
        <div className={styles.tweetSection}>
          <span className={styles.letterCounter}>{counter}/280</span>
          <button className={styles.tweetButton}>Tweet</button>
        </div>
        <div className={styles.tweetsContainer}>{tweets}</div>
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
