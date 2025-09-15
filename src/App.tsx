import React, { useState } from 'react';
import './App.css';
import OrderPage from './components/orderPage';

function App(): React.JSX.Element {
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [view, setView] = useState<'title' | 'menu' | 'receipt'>('title');

  const handleStartOrder = () => {
    setView('menu');
  };

  const handleOrderCreate = (order: any) => {
    setCurrentOrder(order);
    setView('receipt');
  };

  const handleBackToMenu = () => {
    setCurrentOrder(null);
    setView('menu');
  };

  const handleBackToPreviousExit = () => {
    setCurrentOrder(null);
    setView('title');
  };

  return (
    <div className="App">
      <OrderPage
        view={view}
        currentOrder={currentOrder}
        handleStartOrder={handleStartOrder}
        handleOrderCreate={handleOrderCreate}
        handleBackToMenu={handleBackToMenu}
        handleBackToPreviousExit={handleBackToPreviousExit}
      />
    </div>
  );
}

export default App;
