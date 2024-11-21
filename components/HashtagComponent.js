import styles from '../styles/HashtagComponent.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function HashtagComponent() {

  const router = useRouter();
  const { slug } = router.query;

  const [hashtag, setHashtag] = useState('')

  useEffect(() => {
    if (slug) {
        setHashtag("#" +slug);
    }
  }, [slug]);

  function searchHashtag(e){
    setHashtag(e.target.value)
    let value = e.target.value
    value = value.slice(1)
    router.push(`/hashtag/${value}`, undefined, { shallow: true });
  }


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
        <input  value={hashtag} onChange={(e) =>searchHashtag(e)} type="text" className={styles.input}></input>
      </section>

      <section className={styles.rightSection}>
        <h2 className={styles.title}>Trends</h2>
        <div className={styles.trendsSection}>

          <div className={styles.trend}>
            <h3 className={styles.hashtag}>#hackatweet</h3>
            <p className={styles.tweetsNumber}>2 Tweets</p>
          </div>

          <div className={styles.trend}>
            <h3 className={styles.hashtag}>#hackatweet</h3>
            <p className={styles.tweetsNumber}>2 Tweets</p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default HashtagComponent;
