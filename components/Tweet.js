import React from "react";
import styles from "../styles/Tweet.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { likeTweet, unlikeTweet } from "../reducers/likes";

const Tweet = ({
  date,
  message,
  like,
  avatar,
  firstname,
  username,
  tweetId,
  isLiked,
  isUser,
  handleDeleteTweet,
  handleUpdateLikes,
}) => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.likes.value);

  const handleLikeTweet = () => {
    if (!user.token) {
      return;
    }

    const objet = {
      token: user.token,
      tweetId,
    };
    const url = isLiked
      ? "http://localhost:3000/tweets/unlikeTweet"
      : "http://localhost:3000/tweets/likeTweet";

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(objet),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          handleUpdateLikes(tweetId, data.tweet.like);
          if (!isLiked) {
            dispatch(likeTweet(tweetId));
          } else {
            dispatch(unlikeTweet(tweetId));
          }
        }
      });
  };

  const handleDeleteTweets = () => {
    if (!user.token) {
      return;
    }
    const token = user.token;
    fetch(`http://localhost:3000/tweets/deleteTweet/${token}/${tweetId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          handleDeleteTweet(tweetId);
        }
      });
  };

  let iconStyle = {};
  if (isLiked) {
    iconStyle = { color: "red" };
  }

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.info}>
        <img
          src={avatar}
          alt="Picture of the user"
          className={styles.userImage}
        />
        {/* <p>
          {firstname}
          <span className={styles.textGrey}>
            @{username}. {date}
          </span>
        </p> */}
        <div className={styles.text}>
          <span>{firstname}</span>
          <p>@{username}</p>
          <p>.</p>
          <p>{date}</p>
        </div>
      </div>
      <p className={styles.message}>{message}</p>
      <div className={styles.like}>
        <FontAwesomeIcon
          icon={faHeart}
          onClick={handleLikeTweet}
          style={iconStyle}
        />
        <p> {like}</p>
        {isUser && (
          <FontAwesomeIcon icon={faTrashCan} onClick={handleDeleteTweets} />
        )}
      </div>
    </div>
  );
};

export default Tweet;


