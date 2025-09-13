import React, { useState, useEffect } from 'react';
import { kakigoriApi } from '../api/client';

const MenuList = ({ onOrderCreate }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await kakigoriApi.getMenu();
        setMenu(response.menu);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleOrder = async (menuItemId) => {
    try {
      const order = await kakigoriApi.createOrder(menuItemId);
      onOrderCreate(order);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>メニューを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <p>エラー: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>🍧 かき氷メニュー</h2>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {menu.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{item.name}</h3>
            <p style={{ margin: '0 0 15px 0', color: '#666' }}>
              {item.description}
            </p>
            <button
              onClick={() => handleOrder(item.id)}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
              注文する
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
