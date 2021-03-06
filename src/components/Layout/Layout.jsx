import Head from 'next/head';
import styles from './Layout.module.css';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Subject ID Generator</title>
    </Head>
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Subject ID Generator</h1>
        {children}
      </div>
    </main>
  </>
);

export default Layout;
