import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders input field', () => {
  const { getByTestId } = render(<App />);
  const textInput = getByTestId('input-text');

  expect(textInput).toHaveValue('');
});

test('renders button', () => {
  const { getByTestId } = render(<App />);
  const button = getByTestId('button');

  expect(button).toBeEnabled();
});

test('renders empty div for answer', () => {
  const { getByTestId } = render(<App />);
  const answer = getByTestId('answer');

  expect(answer).toHaveTextContent('');
});
