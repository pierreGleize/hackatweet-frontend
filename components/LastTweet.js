import styles from "../styles/Tweet.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { likeTweet, unlikeTweet } from "../reducers/likes";

const LastTweet = (props) => {
  return (
    <>
      <h1>Hello</h1>
    </>
  );
};

export default LastTweet;
