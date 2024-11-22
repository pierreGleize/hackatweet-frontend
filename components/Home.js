import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";
import Trends from "./Trends";
import { useState, useEffect } from "react";
import Link from "next/link";
import Tweet from "./Tweet";
import moment from 'moment';


function Home() {
  const [tweetsData, setTweetsData] = useState([]);
  const [lastTweet, setLastTweet] = useState({});
  const [firstName, setFirstName] = useState('')
  const [username, setUsername] = useState('')
  const [tweetMessage, setTweetMessage] = useState("");
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.value);
  const likes = useSelector((state) => state.likes.value);

  
  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const sortedTweets = data.tweets.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setTweetsData(sortedTweets);
        }
      });
  }, []);

  // Fetch pour récupérer les trends
  useEffect(() => {
    fetch("http://localhost:3000/tweets/hashtags")
      .then((response) => response.json())
      .then(data => {
        let trendsTab = [];
        for (let hashtag of data.result) {
          trendsTab.push(hashtag);
        }
        setTrends(trendsTab);
      });
  }, []);

  // Création des composants trends
  const trendsTab = trends.map((element) => {
    return <Trends hashtag={element.hashtag} count={element.count} />;
  });


  useEffect(() => {
    if(!user.token){
      return
    }
    fetch(`http://localhost:3000/users/${user.token}`)
    .then(response => response.json())
    .then(data => {
      let trendsTab = []
      for (let hashtag of data.result){
        trendsTab.push(hashtag)
      }
      setTrends(trendsTab)
    })
  },[])

  // Création des composants trends
  const trendsTab = trends.map((element) => {
    return <Trends hashtag={element.hashtag} count={element.count} />;
  });


  useEffect(() => {
    if(!user.token){
      return
    }
    fetch(`http://localhost:3000/users/${user.token}`)
    .then(response => response.json())
    .then(data => {
      if(data.result){
        setFirstName(data.firstName);
        setUsername(data.username);
      }
    })
  }, [])


  useEffect(() => {
    if(!user.token){
      return
    }
    fetch(`http://localhost:3000/users/${user.token}`)
    .then(response => response.json())
    .then(data => {
      if(data.result){
        setFirstName(data.firstName);
        setUsername(data.username);
      }
    })
  }, [])

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

  // let styleWord = {}
  // const regex = /#[0-9 A-Z]/gi
  // if(element.message.match(regex)){
  //   styleWord = {'color' : '#3b88d5'}
  // }

  const handleTweet = () => {
    if (!user.token) return;
    fetch("http://localhost:3000/tweets/postTweet", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ message: tweetMessage, token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTweetsData((prevTweets) => [data.newTweet, ...prevTweets]);
          setTweetMessage("");
        }
      });
  };
  //Pour mettre a jour le tableau tweetsData afin de rafraichir les composants
  const handleUpdateLikes = (tweetId, newLikes) => {
    setTweetsData((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet._id === tweetId ? { ...tweet, like: newLikes } : tweet
      )
    );
  };
  //Pour mettre a jour le tableau tweetsData afin de rafraichir les composants
  const handleDeleteTweet = (tweetId) => {
    setTweetsData((prevTweets) =>
      prevTweets.filter((tweet) => tweet._id !== tweetId)
    );
  };

  //
  const tweets = tweetsData.map((element, i) => {
    const isLiked = likes.includes(element._id);
    const isUser = element.user.token === user.token;
    const date = moment(element.date).fromNow(true);
    return (
      <Tweet
        key={i}
        date={date}
        message={element.message}
        like={element.like.length}
        avatar={element.user.avatar}
        firstname={element.user.firstName}
        username={element.user.username}
        tweetId={element._id}
        isLiked={isLiked}
        isUser={isUser}
        handleDeleteTweet={handleDeleteTweet}
        handleUpdateLikes={handleUpdateLikes}
      />
    );
  });

  return (
    <div className={styles.home}>
      <section className={styles.leftSection}>
        <Link href="/homepage"><img className={styles.leftTwitterLogo} src='/twitter.png'></img></Link>
        <div className={styles.userDiv}>
          <div className={styles.userSection}>
            <img className={styles.userLogo} src='/userIcon.png'></img>
            <div className={styles.userInfos}>
              <h3 className={styles.userFirstName}>{firstName}</h3>
              <span className={styles.username}>{username}</span>
            
              <button className={styles.logout} onClick={handleClick}>Logout</button>
            </div>
          </div>
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
          <button className={styles.tweetButton} onClick={handleTweet}>
            Tweet
          </button>
        </div>
        <div className={styles.tweetsContainer}>{tweets}</div>
      </section>
      <div>
        <section className={styles.rightSection}>
          <h2 className={styles.title}>Trends</h2>
          <div className={styles.trendsSection}>{trendsTab}</div>
        </section>
      </div>
    </div>
  );
}
export default Home;
