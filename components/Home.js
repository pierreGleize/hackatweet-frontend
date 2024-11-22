import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router'
import Trends from './Trends';
import { useState, useEffect } from "react";
import Link from "next/link";
import Tweet from "./Tweet";
import moment from 'moment';


function Home() {


  const [tweetsData, setTweetsData] = useState([]);
  const [lastTweet, setLastTweet] = useState({});
  const [firstName, setFirstName] = useState('')
  const [username, setUsername] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const router = useRouter()
  const [tweetMessage, setTweetMessage] = useState('')
  const [counter, setCounter] = useState(0)
  const [trends, setTrends] = useState([])


  
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

  // Fetch pour récupérer les trends
  useEffect(() => {
    fetch("http://localhost:3000/tweets/hashtags")
    .then((response) => response.json())
    .then(data => {
      let trendsTab = []
      for (let hashtag of data.result){
        trendsTab.push(hashtag)
      }
      setTrends(trendsTab)
    })
  },[])

  // Création des composants trends
  const trendsTab = trends.map(element => {
    return <Trends hashtag={element.hashtag} count={element.count}/>
  })
  


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

  let styleWord = {}
  const regex = /#[0-9 A-Z]/gi
  if(element.message.match(regex)){
    styleWord = {'color' : '#3b88d5'}
  }

  const tweets = tweetsData.map((element, i) => (
    <Tweet
      key={i}
      date={moment(element.date).fromNow(true)}
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
          <button className={styles.tweetButton}>Tweet</button>
        </div>
        <div className={styles.tweetsContainer} style={styleWord}>{tweets}</div>
      </section>
      <div>
      <section className={styles.rightSection}>
        <h2 className={styles.title}>Trends</h2>
        <div className={styles.trendsSection}> 
        {trendsTab}
        </div> 
      </section>
      </div>
    </div>
  )
}
export default Home;
