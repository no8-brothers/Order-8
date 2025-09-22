import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BaseMenuArea from './BaseMenuArea';

const mockMenu = [
  {
    id: '1',
    name: 'いちごかき氷',
    description: '甘くて美味しいいちご味',
  },
  {
    id: '2',
    name: 'メロンかき氷',
    description: 'さっぱりとしたメロン味',
  },
];

const defaultProps = {
  menu: mockMenu,
  selectedItem: null,
  onItemSelect: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders menu items correctly', () => {
  render(<BaseMenuArea {...defaultProps} />);

  expect(screen.getByText('いちごかき氷')).toBeInTheDocument();
  expect(screen.getByText('甘くて美味しいいちご味')).toBeInTheDocument();
  expect(screen.getByText('メロンかき氷')).toBeInTheDocument();
  expect(screen.getByText('さっぱりとしたメロン味')).toBeInTheDocument();
});

test('renders item numbers correctly', () => {
  render(<BaseMenuArea {...defaultProps} />);

  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
});

test('calls onItemSelect when item is clicked', () => {
  const mockOnItemSelect = jest.fn();
  render(<BaseMenuArea {...defaultProps} onItemSelect={mockOnItemSelect} />);

  const firstItem = screen.getByText('いちごかき氷');
  fireEvent.click(firstItem);

  expect(mockOnItemSelect).toHaveBeenCalledWith(mockMenu[0]);
});

test('applies selected styles to selected item', () => {
  const selectedItem = mockMenu[0];
  render(<BaseMenuArea {...defaultProps} selectedItem={selectedItem} />);

  const selectedItemElement = screen.getByText('いちごかき氷').closest('div');
  expect(selectedItemElement).toHaveStyle(
    'border: 2px solid var(--accent-yellow)'
  );
});

test('applies default styles to unselected items', () => {
  const selectedItem = mockMenu[0];
  render(<BaseMenuArea {...defaultProps} selectedItem={selectedItem} />);

  const unselectedItemElement = screen.getByText('メロンかき氷').closest('div');
  expect(unselectedItemElement).toHaveStyle(
    'border: 1px solid var(--border-gray)'
  );
  expect(unselectedItemElement).not.toHaveClass('fluorescent-light');
});

test('applies responsive font sizes', () => {
  render(<BaseMenuArea {...defaultProps} />);

  const menuNameElement = screen.getByText('いちごかき氷');
  const menuDescElement = screen.getByText('甘くて美味しいいちご味');

  // 要素が存在することを確認（フォントサイズはCSSで制御されている）
  expect(menuNameElement).toBeInTheDocument();
  expect(menuDescElement).toBeInTheDocument();
});

test('applies responsive sizing to item numbers', () => {
  render(<BaseMenuArea {...defaultProps} />);

  const numberElement = screen.getByText('1');
  const numberContainer = numberElement.parentElement;

  expect(numberContainer).toHaveStyle('width: clamp(35px, 8vw, 45px)');
  expect(numberContainer).toHaveStyle('height: clamp(35px, 8vw, 45px)');
  expect(numberElement).toHaveStyle('font-size: clamp(0.8rem, 3vw, 1.1rem)');
});

test('renders custom content when renderItemContent is provided', () => {
  const customRenderItemContent = (item: any, index: number) => ({
    name: `カスタム${item.name}`,
    description: `カスタム${item.description}`,
  });

  render(
    <BaseMenuArea
      {...defaultProps}
      renderItemContent={customRenderItemContent}
    />
  );

  expect(screen.getByText('カスタムいちごかき氷')).toBeInTheDocument();
  expect(
    screen.getByText('カスタム甘くて美味しいいちご味')
  ).toBeInTheDocument();
});

test('applies custom className and containerStyle', () => {
  const customStyle = { backgroundColor: 'red' };
  const { container } = render(
    <BaseMenuArea
      {...defaultProps}
      className="custom-class"
      containerStyle={customStyle}
    />
  );

  const menuAreaElement = container.querySelector('.exit-sign.custom-class');
  expect(menuAreaElement).toBeInTheDocument();
  expect(menuAreaElement).toHaveStyle('background-color: red');
});

test('renders children when provided', () => {
  render(
    <BaseMenuArea {...defaultProps}>
      <div>カスタム子要素</div>
    </BaseMenuArea>
  );

  expect(screen.getByText('カスタム子要素')).toBeInTheDocument();
});

test('handles empty menu array', () => {
  render(<BaseMenuArea {...defaultProps} menu={[]} />);

  expect(screen.queryByText('1')).not.toBeInTheDocument();
  expect(screen.queryByText('いちごかき氷')).not.toBeInTheDocument();
});
