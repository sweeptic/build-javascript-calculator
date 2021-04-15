import React, { useReducer } from 'react';
import * as actionTypes from './actionTypes';

import styles from './Calculator.module.css';
import Display from './Display';
import NumPad from './NumPad';

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

function addMinus(key, state) {
  // let newMemory = [...state.memory];
  // let newEditor = [...state.editor];
  // if (state.editor.length === 1) {
  // }
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.NUM:
      return addNum(action.payload, state);

    case actionTypes.RESET:
      return init(action.payload);

    case actionTypes.DOT:
      return hasDot(action.payload, state);

    case actionTypes.MINUS:
      return addMinus(action.payload, state);

    case actionTypes.PLUS:
      return { ...state };

    case actionTypes.DIVIDE:
      return { ...state };

    case actionTypes.MULTIPLY:
      return { ...state };

    case actionTypes.EQUAL:
      return { ...state };

    default:
      throw new Error(`invalid action type ${action.type}`);
  }
}

const Calculator = ({ initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  return (
    <div className={styles.container}>
      <Display state={state} />;
      <NumPad dispatch={dispatch} initialState={initialState} />;
    </div>
  );
};

export default Calculator;
