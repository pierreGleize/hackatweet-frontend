import React from "react";
import styles from "../styles/Tweet.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ date, message, like, avatar, firstname, username }) => {
  const regex = /#(\w+)/g;

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.info}>
        <img
          src={avatar}
          alt="Picture of the user"
          className={styles.userImage}
        />
        <p>
          {firstname}{" "}
          <span className={styles.textGrey}>
            {" "}
            @{username}. {date}
          </span>
        </p>
      </div>
      <p>{message}</p>
      <div className={styles.like}>
        <FontAwesomeIcon icon={faHeart} />
        <p> {like}</p>
      </div>
    </div>
  );
};

export default Tweet;
