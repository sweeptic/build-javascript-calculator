import React, { useReducer } from 'react';
import * as actionTypes from './actionTypes';

import styles from './Calculator.module.css';

function init(initialState) {
  return initialState;
}

function hasDot(key, state) {
  if (!state.hasDot) {
    return {
      ...state,
      hasDot: true,
      memory: [...state.editor, key],
      editor: [...state.editor, key],
    };
  } else {
    return { ...state };
  }
}

function addNum(key, state) {
  let newMemory = [...state.memory];
  let newEditor = [...state.editor];

  if (state.editor[0] === '0' && state.editor.length === 1) {
    newMemory = [key];
    if (key !== 0) {
      newEditor = [key];
    }
  } else {
    newMemory = [...newMemory, key];
    newEditor = [...newEditor, key];
  }

  return {
    ...state,
    memory: [...newMemory],
    editor: [...newEditor],
  };
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.NUM:
      return addNum(action.payload, state);

    case actionTypes.RESET:
      return init(action.payload);

    case actionTypes.DOT:
      return hasDot(action.payload, state);

    default:
      throw new Error(`invalid action type ${action.type}`);
  }
}

const Calculator = ({ initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  return (
    <div className={styles.container}>
      <div className={styles.div1}>
        <span data-testid={'memory-element'} className={styles.memory}>
          {state.memory}
        </span>
        <span data-testid={'editor-element'} className={styles.editor}>
          {state.editor}
        </span>
      </div>
      <div
        data-testid={'numpad-AC'}
        className={styles.div2}
        onClick={() =>
          dispatch({ type: actionTypes.RESET, payload: initialState })
        }>
        AC
      </div>
      <div data-testid={'numpad-divide'} className={styles.div3}>
        /
      </div>
      <div data-testid={'numpad-multiplication'} className={styles.div4}>
        *
      </div>
      <div
        data-testid={'numpad-0'}
        className={styles.div5}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 0 })}>
        0
      </div>
      <div data-testid={'numpad-equal'} className={styles.div6}>
        =
      </div>
      <div
        data-testid={'numpad-1'}
        className={styles.div7}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 1 })}>
        1
      </div>
      <div
        data-testid={'numpad-2'}
        className={styles.div8}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 2 })}>
        2
      </div>
      <div
        data-testid={'numpad-3'}
        className={styles.div9}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 3 })}>
        3
      </div>
      <div
        data-testid={'numpad-4'}
        className={styles.div10}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 4 })}>
        4
      </div>
      <div
        data-testid={'numpad-5'}
        className={styles.div11}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 5 })}>
        5
      </div>
      <div
        data-testid={'numpad-6'}
        className={styles.div12}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 6 })}>
        6
      </div>
      <div
        data-testid={'numpad-7'}
        className={styles.div13}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 7 })}>
        7
      </div>
      <div
        data-testid={'numpad-8'}
        className={styles.div14}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 8 })}>
        8
      </div>
      <div
        data-testid={'numpad-9'}
        className={styles.div15}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 9 })}>
        9
      </div>
      <div data-testid={'numpad-minus'} className={styles.div16}>
        -
      </div>
      <div data-testid={'numpad-plus'} className={styles.div17}>
        +
      </div>
      <div
        data-testid={'numpad-dot'}
        className={styles.div18}
        onClick={() => dispatch({ type: actionTypes.DOT, payload: '.' })}>
        .
      </div>
    </div>
  );
};

export default Calculator;
