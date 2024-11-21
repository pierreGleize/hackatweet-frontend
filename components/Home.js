import styles from '../styles/Home.module.css';
import Login from './Login';

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.leftSection}></section>
      <section className={styles.middleSection}></section>
      <section className={styles.rightSection}></section>
    </div>
  );
}

export default Home;
