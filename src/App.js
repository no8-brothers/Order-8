import React, { useState } from 'react';
import './App.css';
import MenuList from './components/MenuList';
import OrderReceipt from './components/OrderReceipt';

function App() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [view, setView] = useState('menu'); // 'menu' or 'receipt'

  const handleOrderCreate = (order) => {
    setCurrentOrder(order);
    setView('receipt');
  };

  const handleBackToMenu = () => {
    setCurrentOrder(null);
    setView('menu');
  };

  return (
    <div className="App">
      <header
        style={{
          backgroundColor: '#282c34',
          padding: '20px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h1>🍧 かき氷注文システム</h1>
        <p>技育祭特別企画 - ラムダ技術部コラボハッカソン</p>
      </header>

      <main
        style={{ minHeight: 'calc(100vh - 140px)', backgroundColor: '#f8f9fa' }}
      >
        {view === 'menu' && <MenuList onOrderCreate={handleOrderCreate} />}

        {view === 'receipt' && (
          <OrderReceipt order={currentOrder} onBackToMenu={handleBackToMenu} />
        )}
      </main>

      <footer
        style={{
          backgroundColor: '#343a40',
          color: 'white',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <p>&copy; 2024 かき氷注文システム - Order-8</p>
      </footer>
    </div>
  );
}

export default App;
