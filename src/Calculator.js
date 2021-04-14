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

  /*
  if (!(state.editor.length === 0 && !key)) {
    let newEditor = [...state.editor];
    if (state.editor[0] === '1' && state.editor.length === 1 && key !== '.') {
      newEditor.shift();
    }
    return {
      ...state,
      memory: [...state.memory, key],
      editor: [...newEditor, key],
    };
  } else {
    return { ...state };
  }
*/
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
        <span className={styles.memory}>{state.memory}</span>
        <span className={styles.editor}>{state.editor}</span>
      </div>
      <div
        className={styles.div2}
        onClick={() =>
          dispatch({ type: actionTypes.RESET, payload: initialState })
        }>
        AC
      </div>
      <div className={styles.div3}>/</div>
      <div className={styles.div4}>*</div>
      <div
        className={styles.div5}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 0 })}>
        0
      </div>
      <div className={styles.div6}>=</div>
      <div
        className={styles.div7}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 1 })}>
        1
      </div>
      <div
        className={styles.div8}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 2 })}>
        2
      </div>
      <div
        className={styles.div9}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 3 })}>
        3
      </div>
      <div
        className={styles.div10}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 4 })}>
        4
      </div>
      <div
        className={styles.div11}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 5 })}>
        5
      </div>
      <div
        className={styles.div12}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 6 })}>
        6
      </div>
      <div
        className={styles.div13}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 7 })}>
        7
      </div>
      <div
        className={styles.div14}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 8 })}>
        8
      </div>
      <div
        className={styles.div15}
        onClick={() => dispatch({ type: actionTypes.NUM, payload: 9 })}>
        9
      </div>
      <div className={styles.div16}>-</div>
      <div className={styles.div17}>+</div>
      <div
        className={styles.div18}
        onClick={() => dispatch({ type: actionTypes.DOT, payload: '.' })}>
        .
      </div>
    </div>
  );
};

export default Calculator;
