import styles from "../styles/HashtagComponent.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Trends from "./Trends";
import Tweet from "./Tweet";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
function HashtagComponent() {
  const router = useRouter();
  const { slug } = router.query;

  const [hashtag, setHashtag] = useState("");
  const [trends, setTrends] = useState([]);
  const [tweets, setTweets] = useState([]);
  const user = useSelector((state) => state.user.value);
  const likes = useSelector((state) => state.likes.value);

  useEffect(() => {
    if (slug) {
      setHashtag("#" + slug);
    }
  }, [slug]);

  function searchHashtag(e) {
    const value = e.target.value.slice(1); // Supprimer le '#' du début
    setHashtag("#" + value);
    router.push(`/hashtag/${value}`, undefined, { shallow: true });
  }

  useEffect(() => {
    fetch("http://localhost:3000/tweets/hashtags")
      .then((response) => response.json())
      .then((data) => setTrends(data.result));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/tweets/searchTweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hashtag: hashtag }),
    })
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
    // const isLiked = tweet.like.includes(user.token);
    const isLiked = likes.includes(tweet._id);
    const isUser = tweet.user.token === user.token;
    const date = moment(tweet.date).fromNow(true);

    return (
      <Tweet
        key={tweet._id}
        date={date}
        message={tweet.message}
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

  return (
    <div className={styles.home}>
      <section className={styles.leftSection}>
        <Link href="/homepage">
          <img
            className={styles.leftTwitterLogo}
            src="/twitter.png"
            alt="Logo"
          />
        </Link>
      </section>

      <section className={styles.middleSection}>
        <h2 className={styles.title}>Hashtag</h2>
        <input
          value={hashtag}
          onChange={searchHashtag}
          type="text"
          className={styles.input}
        />
        <div className={styles.tweetsContainer}>
          {tweetsTab.length > 0 ? (
            tweetsTab
          ) : (
            <p>No tweets found with {hashtag}</p>
          )}
        </div>
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
