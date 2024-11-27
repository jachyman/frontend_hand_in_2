import TopBar from "./ui/dashboard/top-bar";
import { homeLinks } from "./nav-links-home";
import Link from 'next/link';

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
              <h2>Create customized workout plans</h2>
            </section>
            <section>
              <h2>Track client progress</h2>
            </section>
            <section>
              <h2>Organize routines with ease</h2>
            </section>
          </div>
          </main>
      </div>
  );
}

// Inline styles for simplicity
const styles = {
  container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      //padding: '20px',
      //maxWidth: '800px',
      margin: 'auto',
      color: '#333',
  },
  header: {
    marginBottom: '30px',
    
  },
  title: {
      fontSize: '2.5rem',
      color: '#2d89ef',
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
  thirds: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    backgroundColor: '#d3d3d3',
  }
};
