import React from 'react';
import * as actionTypes from './actionTypes';
import styles from './Calculator.module.css';

const NumPad = ({ dispatch, initialState }) => {
  return (
    <>
      <div
        data-testid={'numpad-AC'}
        id='clear'
        className={`${styles.layout_numpad_ac} ${styles.numPad} ${styles.numPadAc}`}
        onClick={() =>
          dispatch({ type: actionTypes.RESET, payload: initialState })
        }>
        AC
      </div>
      <div
        id='divide'
        data-testid={'numpad-divide'}
        className={`${styles.layout_numpad_divide} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.DIVIDE, payload: '/' })}>
        /
      </div>
      <div
        id='multiply'
        data-testid={'numpad-multiply'}
        className={`${styles.layout_numpad_multiply} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.MULTIPLY, payload: '*' })}>
        *
      </div>
      <div
        id='zero'
        data-testid={'numpad-0'}
        className={`${styles.layout_numpad_0} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 0 })}>
        0
      </div>
      <div
        id='equals'
        data-testid={'numpad-equal'}
        className={`${styles.layout_numpad_equal} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.EQUAL, payload: '=' })}>
        =
      </div>
      <div
        id='one'
        data-testid={'numpad-1'}
        className={`${styles.layout_numpad_1} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 1 })}>
        1
      </div>
      <div
        id='two'
        data-testid={'numpad-2'}
        className={`${styles.layout_numpad_2} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 2 })}>
        2
      </div>
      <div
        id='three'
        data-testid={'numpad-3'}
        className={`${styles.layout_numpad_3} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 3 })}>
        3
      </div>
      <div
        id='four'
        data-testid={'numpad-4'}
        className={`${styles.layout_numpad_4} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 4 })}>
        4
      </div>
      <div
        id='five'
        data-testid={'numpad-5'}
        className={`${styles.layout_numpad_5} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 5 })}>
        5
      </div>
      <div
        id='six'
        data-testid={'numpad-6'}
        className={`${styles.layout_numpad_6} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 6 })}>
        6
      </div>
      <div
        id='seven'
        data-testid={'numpad-7'}
        className={`${styles.layout_numpad_7} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 7 })}>
        7
      </div>
      <div
        id='eight'
        data-testid={'numpad-8'}
        className={`${styles.layout_numpad_8} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 8 })}>
        8
      </div>
      <div
        id='nine'
        data-testid={'numpad-9'}
        className={`${styles.layout_numpad_9} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 9 })}>
        9
      </div>
      <div
        id='subtract'
        data-testid={'numpad-minus'}
        className={`${styles.layout_numpad_subtract} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.MINUS, payload: '-' })}>
        -
      </div>
      <div
        id='add'
        data-testid={'numpad-plus'}
        className={`${styles.layout_numpad_add} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.PLUS, payload: '+' })}>
        +
      </div>
      <div
        id='decimal'
        data-testid={'numpad-dot'}
        className={`${styles.layout_numpad_dot} ${styles.numPad}`}
        onClick={() => dispatch({ type: actionTypes.DOT, payload: '.' })}>
        .
      </div>
    </>
  );
};

export default NumPad;
