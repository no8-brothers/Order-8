import { render, screen } from '@testing-library/react';
import App from './App';
import { orderStorage } from './utils/orderStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

beforeEach(() => {
  localStorage.clear();
});

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

test('order counter starts at 0', () => {
  expect(orderStorage.getCurrentOrderCounter()).toBe(0);
});

test('order counter moves to next correctly', () => {
  expect(orderStorage.moveToNextOrderCounter()).toBe(1);
  expect(orderStorage.moveToNextOrderCounter()).toBe(2);
  expect(orderStorage.getCurrentOrderCounter()).toBe(2);
});

test('order counter wraps from 8 to 0', () => {
  orderStorage.setCurrentOrderCounter(8);
  expect(orderStorage.moveToNextOrderCounter()).toBe(0);
});

test('order counter moves to previous correctly', () => {
  orderStorage.setCurrentOrderCounter(5);
  expect(orderStorage.moveToPreviousOrderCounter()).toBe(4);
  expect(orderStorage.getCurrentOrderCounter()).toBe(4);
});

test('order counter stays at 1 when moving previous from 1', () => {
  orderStorage.setCurrentOrderCounter(1);
  expect(orderStorage.moveToPreviousOrderCounter()).toBe(1);
});

test('order counter moves from 0 to 8 when moving previous', () => {
  orderStorage.setCurrentOrderCounter(0);
  expect(orderStorage.moveToPreviousOrderCounter()).toBe(8);
});

test('order counter throws error for invalid range', () => {
  expect(() => orderStorage.setCurrentOrderCounter(-1)).toThrow(
    '注文口番号は0-8の範囲で指定してください'
  );
  expect(() => orderStorage.setCurrentOrderCounter(9)).toThrow(
    '注文口番号は0-8の範囲で指定してください'
  );
});
