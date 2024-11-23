import styles from "../styles/HashtagComponent.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Trends from "./Trends";
import Tweet from "./Tweet";
import { logout } from "../reducers/user";
import moment from "moment";

function HashtagComponent() {
  const router = useRouter();
  const { slug } = router.query;
  const user = useSelector((state) => state.user.value);
  const likes = useSelector((state) => state.likes.value);
  const dispatch = useDispatch();
  const [hashtag, setHashtag] = useState("");
  const [trends, setTrends] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  console.log(tweets);

  // Fonctionnalité pour changer l'url de manière dynamique

  useEffect(() => {
    if (slug) {
      setHashtag("#" + slug);
    } else {
      setHashtag("#");
    }
  }, [slug]);

  function searchHashtag(e) {
    const value = e.target.value.slice(1); // Supprimer le '#' du début
    setHashtag("#" + value);
    router.push(`/hashtag/${value}`, undefined, { shallow: true });
  }

  useEffect(() => {
    fetch("https://hackatweet-backend-amber-rho.vercel.app/tweets/hashtags")
      .then((response) => response.json())
      .then((data) => setTrends(data.result));
  }, []);

  useEffect(() => {
    fetch(
      "https://hackatweet-backend-amber-rho.vercel.app/tweets/searchTweet",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hashtag: hashtag }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const sortedTweets = data.result.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTweets(sortedTweets);
      });
  }, [hashtag]);

  // Mettre à jour les likes dans l'état
  const handleUpdateLikes = (tweetId, newLikes) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet._id === tweetId ? { ...tweet, like: newLikes } : tweet
      )
    );
  };

  // Supprimer un tweet dans l'état
  const handleDeleteTweet = (tweetId) => {
    setTweets((prevTweets) =>
      prevTweets.filter((tweet) => tweet._id !== tweetId)
    );
  };

  const tweetsTab = tweets.map((tweet) => {
    const isLiked = likes.includes(tweet._id);
    const isUser = tweet.user.token === user.token;
    const date = moment(tweet.date).fromNow(true);

    const message = tweet.message.split(" ");
    const tweets = message.map((word, i) => {
      if (word.startsWith("#")) {
        return (
          <span key={i} style={{ color: "#3283d3" }}>
            {word}{" "}
          </span>
        );
      } else {
        return word + " ";
      }
    });

    return (
      <Tweet
        key={tweet._id}
        date={date}
        message={tweets}
        like={tweet.like.length}
        avatar={tweet.user.avatar}
        firstname={tweet.user.firstname}
        username={tweet.user.username}
        tweetId={tweet._id}
        isLiked={isLiked}
        isUser={isUser}
        handleUpdateLikes={handleUpdateLikes}
        handleDeleteTweet={handleDeleteTweet}
      />
    );
  });

  useEffect(() => {
    if (!user.token) {
      return;
    }
    fetch(`https://hackatweet-backend-amber-rho.vercel.app/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setFirstName(data.firstName);
          setUsername(data.username);
        }
      });
  }, []);

  const handleClick = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className={styles.home}>
      <section className={styles.leftSection}>
        <Link href="/homepage">
          <img className={styles.leftTwitterLogo} src="/twitter.png"></img>
        </Link>
        <div className={styles.userSection}>
          <img className={styles.userLogo} src="/userIcon.png"></img>
          <div className={styles.userInfos}>
            <h3 className={styles.userFirstName}>{firstName}</h3>
            <span className={styles.username}>@{username}</span>
            <button className={styles.logout} onClick={handleClick}>
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className={styles.middleSection}>
        <h2 className={styles.title}>Hashtag</h2>
        <input
          autoFocus
          value={hashtag}
          onChange={(e) => searchHashtag(e)}
          type="text"
          className={styles.input}
        ></input>
        {tweetsTab.length > 0 ? (
          <div className={styles.tweetsContainer}>{tweetsTab}</div>
        ) : (
          <div className={styles.tweetsContainer}>
            <p className={styles.noTweet}>No tweets found with {hashtag}</p>
          </div>
        )}
      </section>

      <section className={styles.rightSection}>
        <h2 className={styles.title}>Trends</h2>
        <div className={styles.trendsSection}>
          {trends.map((trend) => (
            <Trends
              key={trend.hashtag}
              hashtag={trend.hashtag}
              count={trend.count}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
export default HashtagComponent;
