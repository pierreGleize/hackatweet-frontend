import React from 'react'
import styles from '../styles/Signup.module.css';
import { useState } from 'react';

export default function Signup({closeModal}) {

    const [signupFirstName, setSignupFirstName] = useState('')
    const [signupUsername, setSignupUsername] = useState('')
    const [signupPassword, setSignUpPassword] = useState('')

    function handleClick(){
        console.log(signupFirstName, signupUsername, signupPassword)
    }

  return (
    <div>
      <div className={styles.modalDiv}>
        <div className={styles.signupContainer}>
            <div className={styles.close}>
                <span onClick={closeModal} className={styles.closeButton}>X</span>
            </div>
            <img className={styles.signupTwitterLogo} src='/twitter.png'></img>
            <p className={styles.signupTitle}> Create your Hackatweet account</p>
            <input onChange={(e) => setSignupFirstName(e.target.value)} value={signupFirstName} className={styles.signUpInput} placeholder='Firstname'></input>
            <input onChange={(e) => setSignupUsername(e.target.value)} value={signupUsername} className={styles.signUpInput} placeholder='Username'></input>
            <input onChange={(e) => setSignUpPassword(e.target.value)} value={signupPassword} type='password'className={styles.signUpInput} placeholder='Password'></input>
            <button onClick={handleClick} className={styles.signUpButton}>Sign-Up</button>

        </div>
      </div>
      
    </div>
  )
}
