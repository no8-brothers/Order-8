import React, { useState, useEffect } from 'react';
import './App.css';
import OrderPage from './components/orderPage';
import { orderStorage } from './utils/orderStorage';

function App(): React.JSX.Element {
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [view, setView] = useState<'title' | 'menu' | 'receipt'>('title');
  const [currentOrderCounter, setCurrentOrderCounter] = useState<number>(0);

  useEffect(() => {
    const orderCounter = orderStorage.getCurrentOrderCounter();
    setCurrentOrderCounter(orderCounter);
    console.log(`現在の注文口: ${orderCounter}番`);
  }, []);

  const handleStartOrder = () => {
    orderStorage.setCurrentOrderCounter(0);
    setCurrentOrderCounter(0);
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

  const handleMoveToNextCounter = () => {
    const next = orderStorage.moveToNextOrderCounter();
    setCurrentOrderCounter(next);
    console.log(`移動: ${next}番注文口`);
  };

  const handleMoveToPreviousCounter = () => {
    const previous = orderStorage.moveToPreviousOrderCounter();
    setCurrentOrderCounter(previous);
    console.log(`移動: ${previous}番注文口`);
  };

  const handleForceReturnToZero = () => {
    orderStorage.setCurrentOrderCounter(0);
    setCurrentOrderCounter(0);
    console.log('不正解により0番注文口に戻される');
  };

  return (
    <div className="App">
      <OrderPage
        view={view}
        currentOrder={currentOrder}
        currentOrderCounter={currentOrderCounter}
        handleStartOrder={handleStartOrder}
        handleOrderCreate={handleOrderCreate}
        handleBackToMenu={handleBackToMenu}
        handleBackToPreviousExit={handleBackToPreviousExit}
        handleMoveToNextCounter={handleMoveToNextCounter}
        handleMoveToPreviousCounter={handleMoveToPreviousCounter}
        handleForceReturnToZero={handleForceReturnToZero}
      />
    </div>
  );
}

export default App;
