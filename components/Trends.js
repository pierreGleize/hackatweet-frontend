import { useState } from 'react';
import styles from '../styles/Trends.module.css';

export default function Trends() {

    const [hashtag, setHashtag] = useState('')
    const [counterHashtag, setCounterHashtag] = useState(0)

    
    return (
        <div className={styles.home}>
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
    )
}