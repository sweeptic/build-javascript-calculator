import styles from './App.module.css';
import Calculator from './Calculator';

export const initialState = {
  editor: [0],
  memory: [],
  hasOperatorFirst: undefined,
  editorHasValue: false,
  memoryHasValue: false,
  minusValue: false,
  calculationDone: false,
  editorNumericValue: false,
  editorHasDot: false,
  memoryIsEmpty: true,
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
