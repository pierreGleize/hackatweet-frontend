import styles from "../styles/Login.module.css";
import { createPortal } from "react-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import { useState } from "react";

function Login() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  return (
    <div>
      <main className={styles.login}>
        <div className={styles.leftDiv}>
          <img className={styles.leftTwitterLogo} src="/twitter.png"></img>
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.loginDiv}>
            <img className={styles.rightTwitterLogo} src="/twitter.png"></img>
            <h1 className={styles.mainTitle}>See what's happening</h1>
            <h2 className={styles.secondTitle}>Join Hackatweet today.</h2>
            <button
              onClick={() => setShowSignupModal(true)}
              className={styles.signupButton}
            >
              Sign up
            </button>
            {showSignupModal &&
              createPortal(
                <Signup closeModal={() => setShowSignupModal(false)} />,
                document.body
              )}
            <p className={styles.littleText}>Already have an account ?</p>
            <button
              onClick={() => setShowSigninModal(true)}
              className={styles.signinButton}
            >
              Sign in
            </button>
            {showSigninModal &&
              createPortal(
                <Signin closeModal={() => setShowSigninModal(false)} />,
                document.body
              )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
