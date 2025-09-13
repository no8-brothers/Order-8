import React from 'react';

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return '🔄 注文受付中';
    case 'waitingPickup':
      return '✅ 受取待ち';
    case 'completed':
      return '🎉 完了';
    default:
      return status;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return '#ffc107';
    case 'waitingPickup':
      return '#28a745';
    case 'completed':
      return '#6f42c1';
    default:
      return '#6c757d';
  }
};

const OrderReceipt = ({ order, onBackToMenu }) => {
  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>注文情報が見つかりません</p>
        <button
          onClick={onBackToMenu}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          メニューに戻る
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <div
        style={{
          border: '2px solid #28a745',
          borderRadius: '10px',
          padding: '30px',
          backgroundColor: '#f8f9fa'
        }}
      >
        <h2 style={{ color: '#28a745', marginBottom: '20px' }}>🧾 注文完了</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '3rem', margin: '10px 0', color: '#333' }}>
            #{order.order_number}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>注文番号</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '10px 0', color: '#333' }}>{order.menu_name}</h3>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: getStatusColor(order.status),
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {getStatusText(order.status)}
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
          <p style={{ margin: '5px 0', color: '#666' }}>注文ID: {order.id}</p>
          <p style={{ margin: '5px 0', color: '#666' }}>メニューID: {order.menu_item_id}</p>
        </div>

        <button
          onClick={onBackToMenu}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          新しい注文をする
        </button>
      </div>
    </div>
  );
};

export default OrderReceipt;