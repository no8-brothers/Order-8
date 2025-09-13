import React, { useState, useEffect } from 'react';
import { kakigoriApi } from '../api/client';

const MenuList = ({ onOrderCreate }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const handleOrder = async () => {
    if (!selectedItem) return;
    
    try {
      const order = await kakigoriApi.createOrder(selectedItem.id);
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
        {menu.map((item) => {
          const isSelected = selectedItem && selectedItem.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleItemSelect(item)}
              style={{
                border: isSelected ? '3px solid #007bff' : '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: isSelected ? '#e3f2fd' : '#f9f9f9',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{item.name}</h3>
              <p style={{ margin: '0 0 15px 0', color: '#666' }}>
                {item.description}
              </p>
              {isSelected && (
                <div
                  style={{
                    color: '#007bff',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  ✓ 選択中
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={handleOrder}
          disabled={!selectedItem}
          style={{
            backgroundColor: selectedItem ? '#28a745' : '#6c757d',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '50px',
            cursor: selectedItem ? 'pointer' : 'not-allowed',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            opacity: selectedItem ? 1 : 0.6,
          }}
        >
          {selectedItem ? `${selectedItem.name}を注文する` : 'メニューを選択してください'}
        </button>
      </div>
    </div>
  );
};

export default MenuList;
