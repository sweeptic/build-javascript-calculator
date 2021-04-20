import React from 'react';
import styles from './Calculator.module.css';

const Display = ({ state }) => {
  return (
    <>
      <div className={`${styles.display} ${styles.layout_display} `}>
        <span data-testid={'memory-element'} className={styles.memory}>
          {state.memory}
          {state.editor}
        </span>
        <span
          id='display'
          data-testid={'editor-element'}
          className={styles.editor}>
          {state.editor}
        </span>
      </div>
    </>
  );
};

export default Display;
