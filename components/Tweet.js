import React from "react";
import styles from "../styles/Tweet.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Tweet = () => {
  const regex = /#(\w+)/g;

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.info}>
        <img
          src="/userIcon.png"
          alt="Picture of the user"
          className={styles.userImage}
        />
        <p>
          Antoine{" "}
          <span className={styles.textGrey}> @Antoine le prof . 5 hours</span>
        </p>
      </div>
      <p>Welcome to #hackatweet</p>
      <div className={styles.like}>
        <FontAwesomeIcon icon={faHeart} />
        <p> 0</p>
      </div>
    </div>
  );
};

export default Tweet;
