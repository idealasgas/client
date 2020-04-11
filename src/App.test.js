import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
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

test('button click creates answer', async () => {
  const app = shallow((<App />));
  app.setState({ value: 'x^2-4=0' });
  app.find('button').simulate('click', { preventDefault: () => {}});
  await new Promise(r => setTimeout(r, 2000));
  expect(app.find('.Solution').text()).toEqual('2, -2');
});
