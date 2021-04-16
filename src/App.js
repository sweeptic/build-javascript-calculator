import styles from './App.module.css';
import Calculator from './Calculator';

export const initialState = {
  editor: [0],
  memory: [],
  hasDot: false,
  hasOperatorFirst: undefined,
  editorHasValue: false,
  preCursor: false,
};

function App() {
  return (
    <div className={styles.app}>
      <h1>Javascript Calculator</h1>
      <Calculator initialState={initialState} />
    </div>
  );
}

export default App;
