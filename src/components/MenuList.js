import React, { useState, useEffect } from 'react';
import { kakigoriApi } from '../api/client';
import ExitButton from './ExitButton';
import ExitSign from './ExitSign';

const MenuList = ({ onOrderCreate, onBackToPreviousExit }) => {
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
    <div 
      className="underground-bg"
      style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px',
        minHeight: 'calc(100vh - 140px)',
        position: 'relative',
      }}
    >
      {/* 蛍光灯効果 */}
      <div
        className="fluorescent-light"
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: '3px',
          background: 'linear-gradient(to right, transparent, var(--accent-yellow), transparent)',
          borderRadius: '2px',
        }}
      />

      {/* 0番注文口案内板（左側に配置） */}
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <ExitSign exitNumber={0} size="medium" />
      </div>

      {/* メニューエリア */}
      <div
        className="exit-sign"
        style={{
          marginBottom: '30px',
          padding: '25px',
        }}
      >
        <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
        {menu.map((item, index) => {
          const isSelected = selectedItem && selectedItem.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleItemSelect(item)}
              className={isSelected ? 'fluorescent-light' : ''}
              style={{
                border: isSelected 
                  ? '2px solid var(--accent-yellow)' 
                  : '1px solid var(--border-gray)',
                borderRadius: '4px',
                padding: '20px',
                backgroundColor: isSelected 
                  ? 'var(--bg-tile)' 
                  : 'var(--bg-darker)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {/* 路線図風の番号 */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isSelected 
                    ? 'var(--accent-yellow)' 
                    : 'var(--border-gray)',
                  color: isSelected 
                    ? 'var(--bg-darker)' 
                    : 'var(--text-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>

              <div style={{ flex: 1 }}>
                <h3 
                  style={{ 
                    margin: '0 0 8px 0', 
                    color: 'var(--text-light)',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                  }}
                >
                  {item.name}
                </h3>
                <p 
                  style={{ 
                    margin: '0', 
                    color: 'var(--text-dim)',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
        </div>
      </div>
      
      <div 
        className="exit-sign"
        style={{ 
          textAlign: 'center',
          padding: '20px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ExitButton
          onClick={onBackToPreviousExit}
          variant="default"
          size="medium"
          disabled={true}
        >
          引き返す
        </ExitButton>
        
        <ExitButton
          onClick={handleOrder}
          disabled={!selectedItem}
          variant="primary"
          size="large"
        >
          注文する
        </ExitButton>
      </div>
    </div>
  );
};

export default MenuList;
