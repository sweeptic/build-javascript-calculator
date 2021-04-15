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
    if (state.memory.length === 0) {
      return {
        ...state,
        hasDot: true,
        memory: [...state.editor, key],
        editor: [...state.editor, key],
      };
    } else if (state.editor[0] === '-') {
      return {
        ...state,
        hasDot: true,
        memory: [...['-', '0'], key],
        editor: [0, key],
      };
    } else {
      return {
        ...state,
        hasDot: true,
        memory: [...state.memory, key],
        editor: [...state.editor, key],
      };
    }
  } else {
    return { ...state };
  }
}

function addNum(key, state) {
  if (state.editor[0] === '0' && state.editor.length === 1) {
    let newMemory = [...state.memory];
    let newEditor = [...state.editor];
    newMemory = [key];
    if (key !== 0) {
      newEditor = [key];
    }
    return {
      ...state,
      memory: [...newMemory],
      editor: [...newEditor],
    };
  } else if (state.editor[0] === '-') {
    return {
      ...state,
      memory: [...state.memory, key],
      editor: [key],
    };
  } else {
    return {
      ...state,
      memory: [...state.memory, key],
      editor: [...state.editor, key],
    };
  }
}

function addMinus(key, state) {
  //az elejen lekezelni az edge case eket a vegen pedig elkuldeni muveletre
  if (state.editor[0] === '-' && state.memory[0] === '-') {
    return {
      ...state,
    };
  } else if (state.editor[0] === '0' && state.editor.length === 1 && state.memory.length === 0) {
    return {
      memory: [key],
      editor: [key],
    };
  } else {
    console.log('minus operation');
    return {
      ...state,
    };
  }
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
      <Display state={state} />
      <NumPad dispatch={dispatch} initialState={initialState} />
    </div>
  );
};

export default Calculator;
