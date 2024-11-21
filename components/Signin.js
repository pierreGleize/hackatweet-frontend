import React from 'react'
import styles from '../styles/Signin.module.css';
import { useState } from 'react';

export default function Signin({closeModal}) {

    const [signinUsername, setSigninUsername] = useState('')
    const [signinPassword, setSigninPassword] = useState('')

    function handleClick(){
        console.log(signinUsername, signinPassword)
    }

  return (
    <div>
      <div className={styles.modalDiv}>
        <div className={styles.signupContainer}>
            <div className={styles.close}>
                <span onClick={closeModal} className={styles.closeButton}>X</span>
            </div>
            <img className={styles.signupTwitterLogo} src='/twitter.png'></img>
            <p className={styles.signupTitle}> Connect to Hackatweet</p>
            <input onChange={(e) => setSigninUsername(e.target.value)} value={signinUsername} className={styles.signUpInput} placeholder='Username'></input>
            <input onChange={(e) => setSigninPassword(e.target.value)} value={signinPassword} type='password'className={styles.signUpInput} placeholder='Password'></input>
            <button onClick={handleClick} className={styles.signUpButton}>Sign-in</button>

        </div>
      </div>
      
    </div>
  )
}
