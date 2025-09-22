import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MenuList from './MenuList';
import { kakigoriApi } from '../api/client';

// Mock the API
jest.mock('../api/client', () => ({
  kakigoriApi: {
    getMenu: jest.fn(),
    createOrder: jest.fn(),
  },
}));

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

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
});

const mockMenu = [
  {
    id: '1',
    name: 'いちご かき氷',
    description: '甘くて美味しい いちご味',
  },
  {
    id: '2',
    name: 'メロン かき氷 特大',
    description: 'さっぱりとした メロン味',
  },
];

const defaultProps = {
  onOrderCreate: jest.fn(),
  onBackToPreviousExit: jest.fn(),
  currentOrderCounter: 0,
  onMoveToNextCounter: jest.fn(),
  onMoveToPreviousCounter: jest.fn(),
  onForceReturnToZero: jest.fn(),
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  (kakigoriApi.getMenu as jest.Mock).mockResolvedValue({ menu: mockMenu });
});

test('renders loading state initially', () => {
  render(<MenuList {...defaultProps} />);
  expect(screen.getByText('メニューを読み込み中...')).toBeInTheDocument();
});

test('renders menu items after loading', async () => {
  render(<MenuList {...defaultProps} />);

  await waitFor(() => {
    expect(screen.getByText('いちごかき氷')).toBeInTheDocument();
    expect(screen.getByText('メロンかき氷特大')).toBeInTheDocument();
  });
});

test('removes spaces from menu item names', async () => {
  render(<MenuList {...defaultProps} />);

  await waitFor(() => {
    // スペースが削除されていることを確認
    expect(screen.getByText('いちごかき氷')).toBeInTheDocument();
    expect(screen.getByText('メロンかき氷特大')).toBeInTheDocument();
    // スペース付きの名前は存在しないことを確認
    expect(screen.queryByText('いちご かき氷')).not.toBeInTheDocument();
    expect(screen.queryByText('メロン かき氷 特大')).not.toBeInTheDocument();
  });
});

test('renders menu item descriptions with original spacing', async () => {
  render(<MenuList {...defaultProps} />);

  await waitFor(() => {
    // 説明文は元のスペースが保持されていることを確認
    expect(screen.getByText('甘くて美味しい いちご味')).toBeInTheDocument();
    expect(screen.getByText('さっぱりとした メロン味')).toBeInTheDocument();
  });
});

test('enables order button when item is selected', async () => {
  render(<MenuList {...defaultProps} />);

  await waitFor(() => {
    const orderButton = screen.getByText('注文する');
    expect(orderButton).toBeDisabled();

    const menuItem = screen.getByText('いちごかき氷');
    fireEvent.click(menuItem);

    expect(orderButton).not.toBeDisabled();
  });
});

test('displays error when API fails', async () => {
  (kakigoriApi.getMenu as jest.Mock).mockRejectedValue(new Error('API Error'));

  render(<MenuList {...defaultProps} />);

  await waitFor(() => {
    expect(screen.getByText('エラー: API Error')).toBeInTheDocument();
  });
});

test('disables back button at counter 0', async () => {
  render(<MenuList {...defaultProps} currentOrderCounter={0} />);

  await waitFor(() => {
    const backButton = screen.getByText('引き返す');
    expect(backButton).toBeDisabled();
  });
});

test('enables back button at counter other than 0', async () => {
  render(<MenuList {...defaultProps} currentOrderCounter={1} />);

  await waitFor(() => {
    const backButton = screen.getByText('引き返す');
    expect(backButton).not.toBeDisabled();
  });
});
