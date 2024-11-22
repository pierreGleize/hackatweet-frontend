import styles from '../styles/HashtagComponent.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Trends from './Trends';
import Tweet from './Tweet';

function HashtagComponent() {

  const router = useRouter();
  const { slug } = router.query;

  const [hashtag, setHashtag] = useState('')
  const [trends, setTrends] = useState([])
  const [tweets, setTweets] = useState([])
  console.log(tweets)

  // Fonctionnalité pour changer l'url de manière dynamique

  useEffect(() => {
    if (slug) {
        setHashtag("#" +slug);
    } else {
      setHashtag("#");
    }
  }, [slug]);

  function searchHashtag(e){
    setHashtag(e.target.value)
    let value = e.target.value
    value = value.slice(1)
    router.push(`/hashtag/${value}`, undefined, { shallow: true });
  }

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

    // Fetch pour récupérer les tweet selon le hashtag dans l'input
    useEffect(() => {
      let tweetToShow = []
      fetch('http://localhost:3000/tweets/searchTweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({hashtag : hashtag}),
      }).then(response => response.json())
      .then(data => {
        for (let tweet of data.result){
          tweetToShow.push(tweet)
        }
        setTweets(tweetToShow)
      })
    },[hashtag])

    // Création du tableau avec les composants tweet trouvés
    const tweetsTab = tweets.map(tweet => {
      return <Tweet date={tweet.date} message={tweet.message} like={tweet.like.length} avatar={tweet.user.avatar} firstname={tweet.user.firstname} username={tweet.user.username}/>
    })


  return (
    <div className={styles.home}>

      <section className={styles.leftSection}>
      <Link href="/homepage"><img className={styles.leftTwitterLogo} src='/twitter.png'></img></Link>
        <div className={styles.userSection}>
          <img className={styles.userLogo} src='/userIcon.png'></img>
          <div className={styles.userInfos}>
            <h3 className={styles.userFirstName}>Thomas</h3>
            <span className={styles.username}>@thomasLebel</span>
          </div>
        </div>
      </section>

      <section className={styles.middleSection}>
        <h2 className={styles.title}>Hashtag</h2>
        <input  autoFocus value={hashtag} onChange={(e) =>searchHashtag(e)} type="text" className={styles.input}></input>
        {tweetsTab.length > 0 ? <div className={styles.tweetsContainer}>{tweetsTab}</div>
        : <div className={styles.tweetsContainer}><p className={styles.noTweet}>No tweets found with {hashtag}</p></div>
        }
        
      </section>

      <section className={styles.rightSection}>
        <h2 className={styles.title}>Trends</h2>
        <div className={styles.trendsSection}> 
        {trendsTab}
        </div> 
      </section>
    </div>
  );
}

export default HashtagComponent;
