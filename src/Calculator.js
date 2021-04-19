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
  // console.log(newState.editor);

  if (newState.editor.some(e => /\./g.test(e))) {
    return {
      ...newState,
    };
  }

  //reset calculator
  //same as addnum.. outsource into function
  if (newState.memory.some(e => /=+/g.test(e))) {
    return {
      ...newState,
      editor: [0, key],
      memory: [],
    };
  }

  if (!newState.editor.some(e => /\d+/g.test(e))) {
    return {
      ...newState,
      editor: [...newState.editor, 0, key],
    };
  }

  return {
    ...newState,
    editor: [...newState.editor, key],
  };
}

function addNum(key, state) {
  let newState = deepCopyState(state);

  //reset calculator
  if (newState.memory.some(e => /=+/g.test(e))) {
    return {
      ...newState,
      editor: [key],
      memory: [],
    };
  }

  return {
    ...newState,
    editor: [...newState.editor, key],
  };
}

function addOperator(key, state) {
  let newState = deepCopyState(state);

  if (newState.memory.some(e => /=+/g.test(e))) {
    console.log('reset');
    return {
      ...newState,
      memory: newState.editor,
      editor: key,
    };
  }

  // if editor has value and press operator
  if (newState.editor.some(e => /\d+/g.test(e))) {
    console.log('put memory');

    let newKey = '';

    if (newState.memory.length !== 0) {
      newKey = newState.editor.shift();
    }

    return {
      ...newState,
      editor: key,
      memory: [...newState.memory, ...newKey, +[newState.editor.join('')]],
    };
  }

  //if memory has no data
  if (newState.memory.length === 0) {
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
    // }
  }

  //if memory has data
  if (newState.memory.length !== 0) {
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
      // }
    }
  }

  console.log('handle unsupported cases');
  return {
    ...newState,
  };
}

function operatorReducer(array, operator) {
  const wArray = [...array];

  for (let index = 0; index < wArray.length; index++) {
    if (wArray[index + 1] === operator) {
      let value;
      switch (operator) {
        case '*':
          value = wArray[index] * wArray[index + 2];
          break;
        case '/':
          value = wArray[index] / wArray[index + 2];
          break;
        case '+':
          value = wArray[index] + wArray[index + 2];
          break;
        case '-':
          value = wArray[index] - wArray[index + 2];
          break;

        default:
      }

      wArray.splice(index, 3, value);
      index--;
    }
  }
  return wArray;
}

function equal(key, state) {
  let newKey = '';
  let remainingValue = [];
  let newState = {
    ...state,
    memory: [...state.memory],
    editor: [...state.editor],
  };

  if (newState.editor.some(e => /\d+/g.test(e))) {
    if (newState.memory.length !== 0) {
      newKey = newState.editor.shift();
    }
    remainingValue.push(+[newState.editor.join('')]);
  }

  let letsCalculateValue = [...newState.memory, ...newKey, ...remainingValue];

  console.log(letsCalculateValue);

  const result1 = operatorReducer([...letsCalculateValue], '*');
  const result2 = operatorReducer(result1, '/');
  const result3 = operatorReducer(result2, '+');
  const result4 = operatorReducer(result3, '-');

  console.log('result: ', result4);

  return {
    ...newState,
    editor: [result4],
    memory: [...letsCalculateValue, key],
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
