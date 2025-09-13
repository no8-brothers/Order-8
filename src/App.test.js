import { render, screen } from '@testing-library/react';
import App from './App';

test('renders kakigori order system header', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', {
    name: /🍧 かき氷注文システム/i,
  });
  expect(titleElement).toBeInTheDocument();
});

test('renders loading message initially', () => {
  render(<App />);
  const loadingElement = screen.getByText(/メニューを読み込み中/i);
  expect(loadingElement).toBeInTheDocument();
});
