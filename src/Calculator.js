import React, { useReducer } from 'react';
import * as actionTypes from './actionTypes';

import styles from './Calculator.module.css';
import Display from './Display';
import NumPad from './NumPad';

function init(initialState) {
  return initialState;
}

function addDot(key, state) {
  let newState = { ...state, memory: [...state.memory], editor: [...state.editor] };

  //accept dot once
  if (!newState.editorHasDot) {
    newState.editorHasDot = true;
  } else return { ...newState };

  if ((!newState.editorNumericValue && newState.memoryIsEmpty) || newState.editorNumericValue) {
    //delete first 0 at initial state
    if (newState.editor.length === 1 && newState.editor[0] === 0) {
      newState.editor = '0';
    }
    return {
      ...newState,
      editorNumericValue: true,
      editor: [...newState.editor, key],
    };
  }

  if (!newState.editorNumericValue && !newState.memoryIsEmpty) {
    return {
      ...newState,
      editorNumericValue: true,
      memory: [...newState.memory, ...newState.editor],
      editor: '0.',
    };
  }

  return {
    ...newState,
  };
}

function addNum(key, state) {
  // add other value
  let newState = { ...state, memory: [...state.memory], editor: [...state.editor] };

  if (newState.editor.length === 1 && newState.editor[0] === 0 && key === 0) {
    return {
      ...newState,
    };
  }

  if (!newState.memoryIsEmpty && !newState.editorNumericValue) {
    return {
      ...newState,
      memory: [...newState.memory, ...newState.editor],
      editorNumericValue: true,
      editor: [key],
    };
  }

  if (!newState.memoryIsEmpty && newState.editorNumericValue) {
    if (newState.editor.length === 1 && newState.editor[0] === 0) {
      return {
        ...newState,
        editor: [key],
      };
    }
  }

  //default state.
  if (!newState.editorNumericValue && key !== 0) {
    // console.log('x');
    return {
      ...newState,
      memory: newState.editor,
      editorNumericValue: true,
      editor: [key],
    };
  }

  //press key 1-9
  if (newState.editorNumericValue) {
    return {
      ...newState,
      editorNumericValue: true,
      editor: [...newState.editor, key],
    };
  }

  return {
    ...newState,
  };
}

function addOperator(key, state) {
  let newState = { ...state, memory: [...state.memory], editor: [...state.editor] };

  //put operator front of numbers, except first value
  if ((!newState.editorNumericValue && newState.memoryIsEmpty) || !newState.editorNumericValue) {
    //case when minus minus
    if (key === '-' && newState.editor[0] === '-' && !newState.memoryIsEmpty) {
      if (newState.editor.length === 1) {
        return {
          ...newState,
          editor: [...newState.editor, key],
        };
      }
    } else {
      if (key === '-') {
        console.log('minus');
        return {
          ...newState,
          editor: [key],
          minusValue: true,
        };
      }

      console.log('plus');
      return {
        ...newState,
        editor: [key],
        minusValue: false,
      };
    }
  }

  if (newState.editorNumericValue) {
    let handleNum = +[...newState.editor].join('');

    // handle --
    if (newState.memory.slice(-2).join('') === '--') {
      handleNum = handleNum * -1;
      newState.memory.pop();
    }

    if (newState.minusValue) {
      console.log('x');
      handleNum = handleNum * -1;
      newState.memory.pop();
    }

    return {
      ...newState,
      memory: [...newState.memory, handleNum],
      editor: [key],
      editorHasDot: false,
      editorNumericValue: false,
      memoryIsEmpty: false,
      minusValue: false,
    };
  }

  return {
    ...newState,
  };
}

function equal(key, state) {
  let newState = { ...state, memory: [...state.memory], editor: [...state.editor] };

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
