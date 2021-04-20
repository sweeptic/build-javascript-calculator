import React from 'react';
import * as actionTypes from './actionTypes';
import styles from './Calculator.module.css';

const NumPad = ({ dispatch, initialState }) => {
  return (
    <>
      <div
        data-testid={'numpad-AC'}
        // className={styles.div2}
        className={`${styles.div2} ${styles.numPad}  ${styles.numPadAc}`}
        onClick={() =>
          dispatch({ type: actionTypes.RESET, payload: initialState })
        }>
        AC
      </div>
      <div
        data-testid={'numpad-divide'}
        className={`${styles.div3} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.DIVIDE, payload: '/' })}>
        /
      </div>
      <div
        data-testid={'numpad-multiply'}
        className={`${styles.div4} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.MULTIPLY, payload: '*' })}>
        *
      </div>
      <div
        data-testid={'numpad-0'}
        className={`${styles.div5} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 0 })}>
        0
      </div>
      <div
        data-testid={'numpad-equal'}
        className={`${styles.div6} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.EQUAL, payload: '=' })}>
        =
      </div>
      <div
        data-testid={'numpad-1'}
        className={`${styles.div7} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 1 })}>
        1
      </div>
      <div
        data-testid={'numpad-2'}
        className={`${styles.div8} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 2 })}>
        2
      </div>
      <div
        data-testid={'numpad-3'}
        className={`${styles.div9} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 3 })}>
        3
      </div>
      <div
        data-testid={'numpad-4'}
        className={`${styles.div10} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 4 })}>
        4
      </div>
      <div
        data-testid={'numpad-5'}
        className={`${styles.div11} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 5 })}>
        5
      </div>
      <div
        data-testid={'numpad-6'}
        className={`${styles.div12} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 6 })}>
        6
      </div>
      <div
        data-testid={'numpad-7'}
        className={`${styles.div13} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 7 })}>
        7
      </div>
      <div
        data-testid={'numpad-8'}
        className={`${styles.div14} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 8 })}>
        8
      </div>
      <div
        data-testid={'numpad-9'}
        className={`${styles.div15} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 9 })}>
        9
      </div>
      <div
        data-testid={'numpad-minus'}
        className={`${styles.div16} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.MINUS, payload: '-' })}>
        -
      </div>
      <div
        data-testid={'numpad-plus'}
        className={`${styles.div17} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.PLUS, payload: '+' })}>
        +
      </div>
      <div
        data-testid={'numpad-dot'}
        className={`${styles.div18} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.DOT, payload: '.' })}>
        .
      </div>
    </>
  );
};

export default NumPad;
