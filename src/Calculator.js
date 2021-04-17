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

  if (state.calculationDone) {
    return {
      ...newState,
      hasDot: true,
      memory: [0, key],
      editor: [0, key],
      calculationDone: false,
    };
  }

  if (!state.hasDot) {
    //
    // 0.3+6=0.9

    if (state.memory.length === 0) {
      return {
        ...newState,
        hasDot: true,
        memory: [...state.editor, key],
        editor: [...state.editor, key],
      };
    } else if (state.editor[0] === state.hasOperatorFirst) {
      return {
        ...newState,
        hasDot: true,
        memory: [...[...state.memory, 0], key],
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
  // console.log(state.memory);
  // const joinedMemory = [+[...state.memory, key].join('')];

  //?
  const newState = { ...state, editorHasValue: true, preCursor: false };
  const cursedMemory = [...state.memory];
  const precursed_key = state.preCursor ? key * -1 : key;

  if (state.calculationDone) {
    return {
      ...newState,
      memory: [key],
      editor: [key],
      calculationDone: false,
    };
  }

  if (state.editor[0] === 0 && state.editor.length === 1) {
    let newMemory = [...state.memory];
    let newEditor = [...state.editor];

    if (!state.hasOperatorFirst) {
      newMemory = [key];
      if (key !== 0) {
        newEditor = [key];
      }
    } else {
      // TODO HERE

      // -06-9= --3
      // 27--6= 213
      // -0.6-9= -0.-3

      newMemory = [state.hasOperatorFirst, key];
      newEditor = [key];
    }

    // first value
    return {
      ...newState,
      memory: [...newMemory],
      editor: [...newEditor],
    };
  } else if (state.editor[0] === state.hasOperatorFirst) {
    if (state.preCursor) {
      cursedMemory.pop();
    }

    // case of minus
    return {
      ...newState,
      memory: [...cursedMemory, precursed_key],
      editor: [key],
    };
  } else {
    // add other value

    // const x = [+[...state.memory, key].join('')];
    // console.log(x);
    // console.log([...state.memory, key]);

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

  if (state.calculationDone) {
    console.log('x', state.editor);

    return {
      ...state,
      hasDot: false,
      memory: [...state.editor, key],
      editor: [key],
      calculationDone: false,
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
  console.log(state.memory);

  // const convertedMemory = [+[...state.memory].join('')];
  // console.log(convertedMemory);

  if (!state.editorHasValue) {
    return {
      ...state,
      memory: ['=NAN'],
      editor: ['NAN'],
    };
  } else if (!state.calculationDone) {
    const result1 = operatorReducer([...state.memory], '*');
    const result2 = operatorReducer(result1, '/');
    const result3 = operatorReducer(result2, '+');
    const result4 = operatorReducer(result3, '-');

    console.log(result4);

    return {
      ...state,
      calculationDone: true,
      memory: [...state.memory, '= ', result4],
      editor: [...result4],
    };
  } else {
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
