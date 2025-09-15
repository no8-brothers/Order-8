import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TitleScreen from './components/TitleScreen';
import MenuList from './components/MenuList';
import OrderReceipt from './components/OrderReceipt';

function App() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [view, setView] = useState('title'); // 'title', 'menu' or 'receipt'

  const handleStartOrder = () => {
    setView('menu');
  };

  const handleOrderCreate = (order) => {
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
          />
        )}

        {view === 'receipt' && (
          <OrderReceipt order={currentOrder} onBackToMenu={handleBackToMenu} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
