import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ORDER-8 system header', () => {
  render(<App />);

  const headerElement = screen.getByRole('heading', {
    name: /🍧 ORDER-8 SYSTEM/i,
  });
  expect(headerElement).toBeInTheDocument();
});

test('renders title screen initially', () => {
  render(<App />);
  const titleElement = screen.getByText(/タップして/i);
  expect(titleElement).toBeInTheDocument();
});
