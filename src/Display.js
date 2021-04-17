import React from 'react';
import styles from './Calculator.module.css';

const Display = ({ state }) => {
  // console.log(state.editor);

  return (
    <>
      <div className={styles.div1}>
        <span data-testid={'memory-element'} className={styles.memory}>
          {state.memory}|{state.editor}
        </span>
        <span data-testid={'editor-element'} className={styles.editor}>
          {state.editor}
        </span>
      </div>
    </>
  );
};

export default Display;
