import React from 'react';
import Header from './Header';
import Footer from './Footer';
import TitleScreen from './TitleScreen';
import MenuList from './MenuList';
import OrderReceipt from './OrderReceipt';
import ExitSign from './ExitSign';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface MisreadingProps {
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

const Misreading: React.FC<MisreadingProps> = ({
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
        {exitNumber !== undefined && (
          <div style={{
              backgroundColor: 'var(--accent-yellow)',
              color: 'var(--bg-darker)',
              borderRadius: '6px',
              fontWeight: 'bold',
              border: '3px solid var(--border-gray)',
              display: 'inline-block',
              padding: size === 'large' ? '20px 40px' : size === 'small' ? '8px 16px' : '16px 32px',
              fontSize: size === 'large' ? '1.8rem' : size === 'small' ? '0.9rem' : '1.4rem',
              letterSpacing: size === 'large' ? '3px' : size === 'small' ? '1px' : '2px',
              marginBottom: '20px',
            }}>
            <ExitSign exitNumber={exitNumber} size={size} />
          </div>
        )}

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

export default Misreading;
