import React from 'react'
import styles from '../styles/Signup.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {signup} from '../reducers/user';

export default function Signup({closeModal}) {

  const dispatch = useDispatch()

    const [signupFirstName, setSignupFirstName] = useState('')
    const [signupUsername, setSignupUsername] = useState('')
    const [signupPassword, setSignUpPassword] = useState('')

    const handleClick = () =>{
      fetch('http://localhost:3000/users/signup', {
        method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signupUsername, password: signupPassword, firstName : signupFirstName }),
      })
      .then(response => response.json())
      .then(data =>{
        if(data.result){
          console.log(data)
          dispatch(signup({username: signupUsername, firstName: signupFirstName, token : data.token}))
          setSignupFirstName('');
          setSignupUsername('');
          setSignUpPassword('');
        }
      })
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
