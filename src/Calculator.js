import React, { useReducer } from 'react';
import * as actionTypes from './actionTypes';

import styles from './Calculator.module.css';
import Display from './Display';
import NumPad from './NumPad';

function init(initialState) {
  return initialState;
}

function hasDot(key, state) {
  const newState = { ...state, editorHasValue: true };
  if (!state.hasDot) {
    if (state.memory.length === 0) {
      return {
        ...newState,
        hasDot: true,
        memory: [...state.editor, key],
        editor: [...state.editor, key],
      };
    } else if (state.editor[0] === state.hasOperatorFirst) {
      console.log('x');
      return {
        ...newState,
        hasDot: true,
        memory: [...[...state.memory, '0'], key],
        editor: [0, key],
      };
    } else {
      return {
        ...newState,
        hasDot: true,
        memory: [...state.memory, key],
        editor: [...state.editor, key],
      };
    }
  } else {
    return { ...newState };
  }
}

function addNum(key, state) {
  const newState = { ...state, editorHasValue: true, preCursor: false };

  if (state.editor[0] === 0 && state.editor.length === 1) {
    let newMemory = [...state.memory];
    let newEditor = [...state.editor];

    if (!state.hasOperatorFirst) {
      newMemory = [key];
      if (key !== 0) {
        newEditor = [key];
      }
    } else {
      newMemory = [state.hasOperatorFirst, key];
      newEditor = [key];
    }

    return {
      ...newState,
      memory: [...newMemory],
      editor: [...newEditor],
    };
  } else if (state.editor[0] === state.hasOperatorFirst) {
    return {
      ...newState,
      memory: [...state.memory, key],
      editor: [key],
    };
  } else {
    return {
      ...newState,
      memory: [...state.memory, key],
      editor: [...state.editor, key],
    };
  }
}

function addOperator(key, state) {
  //cancel / and * in the beginning
  if (state.memory.length === 0 && !state.editorHasValue && (key === '/' || key === '*')) {
    return {
      ...state,
    };
  }

  if (state.editorHasValue) {
    return {
      ...state,
      hasDot: false,
      editorHasValue: false,
      hasOperatorFirst: key,
      memory: [...state.memory, key],
      editor: [key],
    };
  } else {
    const newMemory = [...state.memory];

    let preCursor = false;

    if (!state.editorHasValue && key === '-') {
      // put precursor if we need negative value
      preCursor = true;
    } else {
      //we can change operator
      newMemory.pop();
    }

    // remove precursor if change operator
    if (state.preCursor) {
      newMemory.pop();
    }

    return {
      ...state,
      preCursor: preCursor,
      hasOperatorFirst: key,
      memory: [...newMemory, key],
      editor: [key],
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
      return addOperator(action.payload, state);

    case actionTypes.PLUS:
      return addOperator(action.payload, state);

    case actionTypes.DIVIDE:
      return addOperator(action.payload, state);

    case actionTypes.MULTIPLY:
      return addOperator(action.payload, state);

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
