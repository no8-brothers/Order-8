import React from 'react';
import Header from './Header';
import Footer from './Footer';
import TitleScreen from './TitleScreen';
import MenuList from './MenuList';
import OrderReceipt from './OrderReceipt';

interface OrderPageProps {
  exitNumber?: number;
  size?: 'small' | 'medium' | 'large';
  view: string;
  currentOrder: any;
  currentOrderCounter: number;
  handleStartOrder: () => void;
  handleOrderCreate: (order: any) => void;
  handleBackToMenu: () => void;
  handleBackToPreviousExit: () => void;
  handleMoveToNextCounter: () => void;
  handleMoveToPreviousCounter: () => void;
  handleForceReturnToZero: () => void;
}

const orderPage: React.FC<OrderPageProps> = ({
  exitNumber,
  size = 'medium',
  view,
  currentOrder,
  currentOrderCounter,
  handleStartOrder,
  handleOrderCreate,
  handleBackToMenu,
  handleBackToPreviousExit,
  handleMoveToNextCounter,
  handleMoveToPreviousCounter,
  handleForceReturnToZero,
}) => {
  return (
    <div>
      <Header />

      <main
        style={{
          minHeight: 'calc(100vh - 100px)',
          backgroundColor: 'var(--bg-dark)',
        }}
      >
        {view === 'title' && <TitleScreen onStartOrder={handleStartOrder} />}

        {view === 'menu' && (
          <MenuList
            onOrderCreate={handleOrderCreate}
            onBackToPreviousExit={handleBackToPreviousExit}
            currentOrderCounter={currentOrderCounter}
            onMoveToNextCounter={handleMoveToNextCounter}
            onMoveToPreviousCounter={handleMoveToPreviousCounter}
            onForceReturnToZero={handleForceReturnToZero}
          />
        )}

        {view === 'receipt' && (
          <OrderReceipt order={currentOrder} onBackToMenu={handleBackToMenu} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default orderPage;
