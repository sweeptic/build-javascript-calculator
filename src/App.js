import styles from './App.module.css';
import Calculator from './Calculator';

function App() {
  return (
    <div className={styles.app}>
      <h1>Javascript Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;
