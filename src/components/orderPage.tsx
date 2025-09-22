import React, { useState, useEffect } from 'react';
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

const OrderPage: React.FC<OrderPageProps> = ({
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
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [displayContent, setDisplayContent] = useState({
    view,
    currentOrder,
    currentOrderCounter,
  });

  useEffect(() => {
    // Only trigger fade transition when currentOrderCounter changes (not view changes)
    if (displayContent.currentOrderCounter !== currentOrderCounter) {
      setIsTransitioning(true);

      const transitionTimer = setTimeout(() => {
        setDisplayContent({ view, currentOrder, currentOrderCounter });
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(transitionTimer);
    } else {
      // For view changes without counter changes, update immediately
      setDisplayContent({ view, currentOrder, currentOrderCounter });
    }
  }, [view, currentOrder, currentOrderCounter, displayContent]);

  return (
    <div>
      <Header />

      <main
        style={{
          minHeight: 'calc(100vh - 100px)',
          backgroundColor: 'var(--bg-dark)',
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 300ms ease-in-out',
        }}
      >
        {displayContent.view === 'title' && (
          <TitleScreen onStartOrder={handleStartOrder} />
        )}

        {displayContent.view === 'menu' && (
          <MenuList
            onOrderCreate={handleOrderCreate}
            onBackToPreviousExit={handleBackToPreviousExit}
            currentOrderCounter={displayContent.currentOrderCounter}
            onMoveToNextCounter={handleMoveToNextCounter}
            onMoveToPreviousCounter={handleMoveToPreviousCounter}
            onForceReturnToZero={handleForceReturnToZero}
          />
        )}

        {displayContent.view === 'receipt' && (
          <OrderReceipt
            order={displayContent.currentOrder}
            onBackToMenu={handleBackToMenu}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrderPage;
