import TopBar from "./ui/dashboard/top-bar";
import { homeLinks } from "./nav-links-home";
import Link from 'next/link';
import Image from "next/image";

export default function HomePage() {
  return (
    <div style={styles.container}>
      <TopBar links={homeLinks} /> 
      
        <header style={styles.header}>
            <h1 style={styles.title}>Welcome to YOUR-Fitness</h1>
            <p style={styles.subtitle}>
                You can create manage your individual workouts!
            </p>
        </header>
        <main style={styles.main}>
          <h2 style={styles.sectionTitle}>What can you do?</h2>

          <div style={styles.thirds}>
            <section>
            <h3 style={styles.thirdsHeader}>Create customized workout plans</h3>
            <ul>
              <li style={styles.li}>As a our customer, you can create your workout acording to your needs</li>
              <li style={styles.li}>If you log in to your profile, you will be able to see all your workouts</li>
            </ul>
            </section>
            <section>
            <h2 style={styles.thirdsHeader}>Track client progress</h2>
            <ul>
              <li style={styles.li}>As a our customer, you can track your progress</li>
              <li style={styles.li}>As a trainer, you can track your clients progress</li>
            </ul>
            </section>
            <section>
            <h2 style={styles.thirdsHeader}>Organize routines with ease</h2>
            <ul>
              <li style={styles.li}>You can organize your workout routines with ease</li>
              <li style={styles.li}>Everything you needd is aviable on our website</li>
            </ul>
            </section>
          </div>
      </main>
      <Image
        src="/images/fitness.jpg"
        alt="FITNESS"
        width={925}
        height={245}
        layout="responsive"
        objectFit="cover"
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      </div>
  );
}

const styles = {
  container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      margin: 'auto',
      color: '#333',
  },
  header: {
    marginBottom: '30px',
    
  },
  title: {
      fontSize: '2.5rem',
      color: 'blue',
  },
  subtitle: {
      fontSize: '1.8rem',
      //marginTop: '10px',
  },
  main: {
      marginTop: '20px',
  },
  sectionTitle: {
      fontSize: '1.8rem',
      marginBottom: '15px',
  },
  thirdsHeader: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  li: {
    backgroundColor: 'white',
    margin: '10px'
  },
  thirds: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    backgroundColor: 'silver',
  }
};
