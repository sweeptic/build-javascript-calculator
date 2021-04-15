import '@testing-library/jest-dom/extend-expect';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import React from 'react';
import Calculator from './Calculator';
import { initialState } from './App';

describe('calculator numpad input tests', () => {
  let wrapper, editor, memory;

  beforeEach(() => {
    wrapper = render(<Calculator initialState={initialState} />);
    memory = getByTestId(wrapper.container, 'memory-element');
    editor = getByTestId(wrapper.container, 'editor-element');
  });

  test('memory/editor renders 1 when clicked 1', () => {
    fireEvent.click(wrapper.getByTestId('numpad-1'));
    expect(memory).toHaveTextContent('1');
    expect(editor).toHaveTextContent('1');
  });
  test('memory/editor renders 100 when clicked 100', () => {
    fireEvent.click(wrapper.getByTestId('numpad-1'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    expect(memory).toHaveTextContent('100');
    expect(editor).toHaveTextContent('100');
  });
  test('memory/editor renders 0 when clicked 0', () => {
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    expect(memory).toHaveTextContent('0');
    expect(editor).toHaveTextContent('0');
  });

  test('memory/editor renders 0 when clicked 000', () => {
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    expect(memory).toHaveTextContent('0');
    expect(editor).toHaveTextContent('0');
  });

  test('memory/editor renders 0. when clicked .', () => {
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    expect(memory).toHaveTextContent('0.');
    expect(editor).toHaveTextContent('0.');
  });

  test('memory/editor renders 0. when clicked ..', () => {
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    expect(memory).toHaveTextContent('0.');
    expect(editor).toHaveTextContent('0.');
  });

  test('memory/editor renders 0.8 when clicked .8', () => {
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-8'));
    expect(memory).toHaveTextContent('0.8');
    expect(editor).toHaveTextContent('0.8');
  });

  test('memory/editor renders 0.8 when clicked .8.', () => {
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-8'));
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    expect(memory).toHaveTextContent('0.8');
    expect(editor).toHaveTextContent('0.8');
  });

  test('memory/editor renders 0.8 when clicked .8..', () => {
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-8'));
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    expect(memory).toHaveTextContent('0.8');
    expect(editor).toHaveTextContent('0.8');
  });

  test('memory/editor renders 0.8 when clicked 0.8', () => {
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-8'));
    expect(memory).toHaveTextContent('0.8');
    expect(editor).toHaveTextContent('0.8');
  });

  test('memory/editor renders 0.50000 when clicked 0.50000', () => {
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-5'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    expect(memory).toHaveTextContent('0.50000');
    expect(editor).toHaveTextContent('0.50000');
  });

  test('memory/editor renders 0.50000 when clicked .50000', () => {
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-5'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    expect(memory).toHaveTextContent('0.50000');
    expect(editor).toHaveTextContent('0.50000');
  });

  test('memory/editor renders 0.000 when clicked 0.000', () => {
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    expect(memory).toHaveTextContent('0.000');
    expect(editor).toHaveTextContent('0.000');
  });

  test('memory/editor renders 0.000 when clicked .000', () => {
    fireEvent.click(wrapper.getByTestId('numpad-.'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    fireEvent.click(wrapper.getByTestId('numpad-0'));
    expect(memory).toHaveTextContent('0.000');
    expect(editor).toHaveTextContent('0.000');
  });

  test('editor renders 0 and memory empty when clicked 12345 and AC', () => {
    fireEvent.click(wrapper.getByTestId('numpad-1'));
    fireEvent.click(wrapper.getByTestId('numpad-2'));
    fireEvent.click(wrapper.getByTestId('numpad-3'));
    fireEvent.click(wrapper.getByTestId('numpad-4'));
    fireEvent.click(wrapper.getByTestId('numpad-5'));
    fireEvent.click(wrapper.getByTestId('numpad-AC'));
    expect(memory).toHaveTextContent('');
    expect(editor).toHaveTextContent('0');
  });
});
