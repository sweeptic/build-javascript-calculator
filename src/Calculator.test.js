import '@testing-library/jest-dom/extend-expect';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import React from 'react';
import Calculator from './Calculator';
import { initialState } from './App';

describe('calculator input tests', () => {
  let wrapper, editor, memory;

  beforeEach(() => {
    wrapper = render(<Calculator initialState={initialState} />);
    memory = getByTestId(wrapper.container, 'memory-element');
    editor = getByTestId(wrapper.container, 'editor-element');
  });

  describe('numpad test (only editor)', () => {
    test('editor renders 0 initial value', () => {
      expect(editor).toHaveTextContent(0);
      // expect(element).toHaveTextContent(/^Text Content$/)
    });

    test('editor renders 0 and memory empty when clicked 12345 and AC', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-2'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-AC'));
      expect(editor).toHaveTextContent(/^0$/);
    });

    test('editor renders 12345 when clicked 12345', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-2'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      expect(editor).toHaveTextContent(/^12345$/);
      // expect(element).toHaveTextContent(/^Text Content$/)
    });
    test('editor renders 3.3 when clicked 3.3.', () => {
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));

      expect(editor).toHaveTextContent(/^3.3$/);
    });
    test('editor renders 3.3 when clicked 3.3.3.', () => {
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));

      expect(editor).toHaveTextContent(/^3.33$/);
    });
    test('editor renders 3. when clicked 3..', () => {
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));

      expect(editor).toHaveTextContent(/^3.$/);
    });
    test('editor renders 1 when clicked 1', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      expect(editor).toHaveTextContent(/^1$/);
    });
    test('editor renders 100 when clicked 100', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      expect(editor).toHaveTextContent(/^100$/);
    });
    test('editor renders 0 when clicked 0', () => {
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      expect(editor).toHaveTextContent(/^0$/);
    });

    test('editor renders 3 when clicked 03', () => {
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      expect(editor).toHaveTextContent(/^3$/);
    });

    test('editor renders 0 when clicked 000', () => {
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      expect(editor).toHaveTextContent(/^0$/);
    });

    test('editor renders 0. when clicked .', () => {
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      expect(editor).toHaveTextContent(/^0.$/);
    });

    test('editor renders 0. when clicked ..', () => {
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      expect(editor).toHaveTextContent(/^0.$/);
    });

    test('editor renders 0.8 when clicked .8', () => {
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-8'));
      expect(editor).toHaveTextContent(/^0.8$/);
    });

    test('editor renders 0.8 when clicked .8.', () => {
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-8'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      expect(editor).toHaveTextContent(/^0.8$/);
    });

    test('editor renders 0.8 when clicked .8..', () => {
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-8'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      expect(editor).toHaveTextContent(/^0.8$/);
    });

    test('editor renders 0.8 when clicked 0.8', () => {
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-8'));
      expect(editor).toHaveTextContent(/^0.8$/);
    });

    test('editor renders 0.50000 when clicked 0.50000', () => {
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      expect(editor).toHaveTextContent(/^0.50000$/);
    });

    test('editor renders 0.50000 when clicked .50000', () => {
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      expect(editor).toHaveTextContent(/^0.50000$/);
    });

    test('editor renders 0.000 when clicked 0.000', () => {
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      expect(editor).toHaveTextContent(/^0.000$/);
    });

    test('editor renders 0.000 when clicked .000', () => {
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      expect(editor).toHaveTextContent(/^0.000$/);
    });
  });

  describe('numpad minus tests', () => {
    test('editor renders - when clicked -', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      expect(editor).toHaveTextContent(/^-$/);
    });

    test('editor: "0" when clicked -0', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      expect(editor).toHaveTextContent(/^-0$/);
    });

    test('editor: "-123" when clicked -0123', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-2'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      expect(editor).toHaveTextContent(/^-123$/);
    });

    test('editor: "-3"  when clicked -03', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      expect(editor).toHaveTextContent(/^-3$/);
    });

    test('editor: "-0." when clicked -.', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      expect(editor).toHaveTextContent(/^-0.$/);
    });

    test('editor: "-8" when clicked -8', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-8'));
      expect(editor).toHaveTextContent(/^-8$/);
    });

    test('editor: "-" when clicked - ', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      expect(editor).toHaveTextContent(/^-$/);
    });

    test('editor: "-" when clicked - - ', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      expect(editor).toHaveTextContent(/^-$/);
    });

    test('editor: "-" when clicked - - -', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      expect(editor).toHaveTextContent(/^-$/);
    });

    test('editor: "-6.2" when clicked -6.2', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-6'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-2'));
      expect(editor).toHaveTextContent(/^-6.2$/);
    });
  });

  describe('calculator functionality', () => {
    test('renders 0 when clicked 1+000', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      expect(editor).toHaveTextContent(/^\+0$/);
    });
    test('renders 6 when clicked 1+0006', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-0'));
      fireEvent.click(wrapper.getByTestId('numpad-6'));
      expect(editor).toHaveTextContent(/^\+6$/);
    });
    test('renders 2 when clicked 1+1', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^2$/);
    });
    test('renders 9 when clicked 5+4', () => {
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^9$/);
    });
    test('renders -1 when clicked -5+4', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^-1$/);
    });
    test('renders -1 when clicked -5++4', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^-1$/);
    });
    test('renders -1 when clicked -5--4', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^-1$/);
    });
    test('renders -1 when clicked --5--4', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^-1$/);
    });
    test('renders -9 when clicked -5+-4', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^-9$/);
    });
    test('renders 20 when clicked -5*-4', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-multiply'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^20$/);
    });
    test('renders 20 when clicked -5*-4', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-multiply'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^20$/);
    });
    test('renders -20 when clicked -5*4', () => {
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-multiply'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^-20$/);
    });
    test('renders 1 when clicked 5*4/5*2+2-9', () => {
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-multiply'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-divide'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-multiply'));
      fireEvent.click(wrapper.getByTestId('numpad-2'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-2'));
      fireEvent.click(wrapper.getByTestId('numpad-minus'));
      fireEvent.click(wrapper.getByTestId('numpad-9'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^1$/);
    });
    test('renders 6 when clicked 1+2+3', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-2'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^6$/);
    });
    test('renders 9 when clicked 1+2+3=9', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-2'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      fireEvent.click(wrapper.getByTestId('numpad-9'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^9$/);
    });
    test('renders 15 when clicked 1+2+3=+9', () => {
      fireEvent.click(wrapper.getByTestId('numpad-1'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-2'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-3'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-9'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^15$/);
    });
    test('renders 10 when clicked 5.5+4.5', () => {
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-plus'));
      fireEvent.click(wrapper.getByTestId('numpad-4'));
      fireEvent.click(wrapper.getByTestId('numpad-dot'));
      fireEvent.click(wrapper.getByTestId('numpad-5'));
      fireEvent.click(wrapper.getByTestId('numpad-equal'));
      expect(editor).toHaveTextContent(/^10$/);
    });
  });
});
