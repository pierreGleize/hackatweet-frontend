import { useState } from 'react';
import styles from '../styles/Trends.module.css';
import { useRouter } from 'next/router';

export default function Trends(props) {
    const formattedHashtag = props.hashtag.slice(1)
    const router= useRouter()
    function handleClick(){
        router.push(`/hashtag/${encodeURIComponent(formattedHashtag)}`)
    }
    
    return (
        
                <>
                    <div onClick={handleClick} className={styles.trend}>
                        <h3 className={styles.hashtag}>{props.hashtag}</h3>
                        {props.count > 1 ? 
                        <p className={styles.tweetsNumber}>{props.count} Tweets</p>
                        :
                        <p className={styles.tweetsNumber}>{props.count} Tweet</p>    
                        }
                        
                    </div>
                </>
            
    )
}