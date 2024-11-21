import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router'
import Trends from './Trends';
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Tweet from "./Tweet";

function Home() {


  const [tweetsData, setTweetsData] = useState([]);
  const [lastTweet, setLastTweet] = useState({});

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const router = useRouter()
  const [tweetMessage, setTweetMessage] = useState('')
  const [counter, setCounter] = useState(0)
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
  const handleClick = () => {
    dispatch(logout())
    router.push('/')
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
      <Link href="/homepage"><img className={styles.leftTwitterLogo} src='/twitter.png'></img></Link>
        <div className={styles.userDiv}>
          <div className={styles.userSection}>
            <img className={styles.userLogo} src='/userIcon.png'></img>
            <div className={styles.userInfos}>
              <h3 className={styles.userFirstName}>{user.firstName}</h3>
              <span className={styles.username}>{user.username}</span>
            </div>
          </div>
          <button className={styles.logout} onClick={handleClick}>Logout</button>
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
      <div>
      <Trends/>
      </div>
    </div>
  );
}

export default Home;
