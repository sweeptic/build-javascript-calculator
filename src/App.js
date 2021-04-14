import styles from './App.module.css';
import Calculator from './Calculator';

function App() {
  const initialState = { editor: ['0'], memory: [], hasDot: false };

  return (
    <div className={styles.app}>
      <h1>Javascript Calculator</h1>
      <Calculator initialState={initialState} />
    </div>
  );
}

export default App;
