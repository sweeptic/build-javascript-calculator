import React, { useReducer } from 'react';
import * as actionTypes from './actionTypes';

import styles from './Calculator.module.css';
import Display from './Display';
import NumPad from './NumPad';
import { deepCopyState } from './util';

function init(initialState) {
  return initialState;
}

function addDot(key, state) {
  let newState = deepCopyState(state);
  return {
    ...newState,
  };
}

function addNum(key, state) {
  let newState = deepCopyState(state);
  return {
    ...newState,
    editor: [...newState.editor, key],
  };
}

function addOperator(key, state) {
  let newState = deepCopyState(state);

  //if memory has no data
  if (newState.memory.length === 0) {
    //ready to put value to memory
    if (newState.editor.some(e => /\d+/g.test(e))) {
      console.log('put memory');
    } else {
      //can type - or (+) precursor
      if (key === '-') {
        return {
          ...newState,
          editor: [key],
        };
      }
      if (key === '+') {
        return {
          ...newState,
          editor: [],
        };
      }
    }
  }
  //if memory has data
  else {
    //ready to put value to memory
    if (newState.editor.some(e => /\d+/g.test(e))) {
      console.log('put memory');
    } else {
      // can type + - * / *- /- +- -- operator and precursor
      if (newState.editor.length === 1 && key === '-') {
        return {
          ...newState,
          editor: [...newState.editor, key],
        };
      } else {
        return {
          ...newState,
          editor: [key],
        };
      }
    }
  }

  return {
    ...newState,
  };
}

function equal(key, state) {
  let newState = {
    ...state,
    memory: [...state.memory],
    editor: [...state.editor],
  };

  console.log(newState.memory);

  return {
    ...newState,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.NUM:
      return addNum(action.payload, state);

    case actionTypes.RESET:
      return init(action.payload);

    case actionTypes.DOT:
      return addDot(action.payload, state);

    case actionTypes.MINUS:
      return addOperator(action.payload, state);

    case actionTypes.PLUS:
      return addOperator(action.payload, state);

    case actionTypes.DIVIDE:
      return addOperator(action.payload, state);

    case actionTypes.MULTIPLY:
      return addOperator(action.payload, state);

    case actionTypes.EQUAL:
      return equal(action.payload, state);

    default:
      throw new Error(`invalid action type ${action.type}`);
  }
}

const Calculator = ({ initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  return (
    <div className={styles.container}>
      <Display state={state} />
      <NumPad dispatch={dispatch} initialState={initialState} />
    </div>
  );
};

export default Calculator;
