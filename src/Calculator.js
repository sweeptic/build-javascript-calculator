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

  //only one dot allowed.
  if (newState.editor.some(e => /\./g.test(e))) {
    return {
      ...newState,
    };
  }

  //reset calculator when calculation is done.
  if (newState.memory.some(e => /=+/g.test(e))) {
    return {
      ...newState,
      editor: [0, key],
      memory: [],
    };
  }

  // when press '.' then editor convert to '.0'.
  if (!newState.editor.some(e => /\d+/g.test(e))) {
    return {
      ...newState,
      editor: [...newState.editor, 0, key],
    };
  }

  // this is the default behavior. can type any number
  return {
    ...newState,
    editor: [...newState.editor, key],
  };
}

function addNum(key, state) {
  let newState = deepCopyState(state);

  // pass 0 when editor only contain 0
  if (newState.editor.join('') === '0') {
    return {
      ...newState,
      editor: [key],
    };
  }

  //don't pass 0 when editor has 'operator and 0' OR replace '0 to number'.
  if (
    newState.editor
      .slice(-2)
      .join('')
      .match(/([/*+-][0])/)
  ) {
    if (key !== 0) {
      newState.editor.splice(-1, 1, key);
    }

    return {
      ...newState,
    };
  }

  //reset calculator when calculation is done.
  if (newState.memory.some(e => /=+/g.test(e))) {
    return {
      ...newState,
      memory: [],
      editor: [key],
    };
  }

  //all other numpad value allowed
  return {
    ...newState,
    editor: [...newState.editor, key],
  };
}

function addOperator(key, state) {
  let newState = deepCopyState(state);

  // reset calculator when calculation is done.
  if (newState.memory.some(e => /=+/g.test(e))) {
    return {
      ...newState,
      memory: newState.editor,
      editor: key,
    };
  }

  // if editor has value and press operator then  put editor to memory
  if (newState.editor.some(e => /\d+/g.test(e))) {
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
  }

  //if memory has data
  if (newState.memory.length !== 0) {
    // can type '+' '-' '*' '/' '*-' '/-' '+-' '--'
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

  return {
    ...newState,
  };
}

function operatorReducer(array) {
  return [...array].reduce((acc, item, index, arr) => {
    if (item.toString().match(/\+|-|\*|\//)) {
      switch (item) {
        case '+':
          acc = acc + arr[index + 1];
          break;
        case '-':
          acc = acc - arr[index + 1];
          break;
        case '*':
          acc = acc * arr[index + 1];
          break;
        case '/':
          acc = acc / arr[index + 1];
          break;
        default:
      }
    }
    return acc;
  }, array[0]);
}

function equal(key, state) {
  let newKey = '';
  let remainingValue = [];
  let newState = {
    ...state,
    memory: [...state.memory],
    editor: [...state.editor],
  };

  if (
    !newState.editor.some(e => /\d+/g.test(e)) ||
    newState.memory.some(e => /=+/g.test(e))
  ) {
    return {
      ...newState,
    };
  }

  if (newState.editor.some(e => /\d+/g.test(e))) {
    if (newState.memory.length !== 0) {
      newKey = newState.editor.shift();
    }
    remainingValue.push(+[newState.editor.join('')]);
  }

  let getCalculateValue = [...newState.memory, ...newKey, ...remainingValue];

  const result = operatorReducer([...getCalculateValue]);

  return {
    ...newState,
    editor: [result],
    memory: [...getCalculateValue, key],
  };
}

function calculatorReducer(state, action) {
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
  const [state, dispatch] = useReducer(calculatorReducer, initialState, init);

  return (
    <div className={styles.container}>
      <Display state={state} />
      <NumPad dispatch={dispatch} initialState={initialState} />
    </div>
  );
};

export default Calculator;
