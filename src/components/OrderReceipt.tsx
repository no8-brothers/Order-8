import React, { useEffect } from 'react';

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return '■ 注文受付中';
    case 'waitingPickup':
      return '■ 受取待ち';
    case 'completed':
      return '■ 完了';
    default:
      return `■ ${status}`;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'var(--accent-yellow)';
    case 'waitingPickup':
      return 'var(--accent-yellow-bright)';
    case 'completed':
      return 'var(--accent-yellow)';
    default:
      return 'var(--border-gray)';
  }
};

interface Order {
  id: string;
  order_number: string;
  menu_name: string;
  status: string;
  menu_item_id: string;
}

interface OrderReceiptProps {
  order: Order | null;
  onBackToMenu: () => void;
}

const OrderReceipt: React.FC<OrderReceiptProps> = ({ order, onBackToMenu }) => {
  useEffect(() => {
    if (!order) return;

    const receiptText = `
===========================================
        ORDER RECEIPT
===========================================

ORDER NUMBER: #${order.order_number}
MENU NAME: ${order.menu_name}
STATUS: ${getStatusText(order.status)}

-------------------------------------------
DETAILS:
ORDER ID: ${order.id}
MENU ID: ${order.menu_item_id}
DATE: ${new Date().toLocaleString('ja-JP')}

-------------------------------------------
Thank you for your order!
===========================================
    `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order_${order.order_number}_receipt.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [order]);

  if (!order) {
    return (
      <div
        className="underground-bg"
        style={{
          textAlign: 'center',
          padding: '20px',
          minHeight: 'calc(100vh - 140px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="exit-sign">
          <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
            注文情報が見つかりません
          </p>
          <button
            onClick={onBackToMenu}
            style={{
              backgroundColor: 'var(--bg-darker)',
              color: 'var(--accent-yellow)',
              border: '2px solid var(--accent-yellow)',
              padding: '15px 25px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontFamily: 'inherit',
              fontWeight: 'bold',
            }}
          >
            ［ メニューに戻る ］
          </button>
        </div>
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
        textAlign: 'center',
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
          background:
            'linear-gradient(to right, transparent, var(--accent-yellow), transparent)',
          borderRadius: '2px',
        }}
      />

      <div className="exit-sign" style={{ padding: '40px', marginTop: '40px' }}>
        {/* 改札機風ヘッダー */}
        <div
          style={{
            marginBottom: '40px',
            margin: '0 -20px 40px -20px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--accent-yellow)',
              color: 'var(--bg-darker)',
              padding: '10px 15px',
              borderRadius: '4px',
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              fontWeight: 'bold',
              display: 'inline-block',
              border: '2px solid var(--border-gray)',
              letterSpacing: 'clamp(1px, 1vw, 2px)',
              whiteSpace: 'nowrap',
            }}
          >
            ■ ORDER COMPLETE ■
          </div>
        </div>

        {/* 大きな注文番号表示 */}
        <div
          style={{
            marginBottom: '30px',
            padding: '20px',
            border: '2px solid var(--accent-yellow)',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-darker)',
          }}
        >
          <div
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-dim)',
              marginBottom: '10px',
            }}
          >
            ORDER NUMBER
          </div>
          <h1
            className="fluorescent-light"
            style={{
              fontSize: '4rem',
              margin: '0',
              color: 'var(--accent-yellow)',
              fontWeight: 'bold',
              letterSpacing: '3px',
            }}
          >
            #{order.order_number}
          </h1>
        </div>

        {/* メニュー名とステータス */}
        <div style={{ marginBottom: '30px' }}>
          <h3
            style={{
              margin: '0 0 15px 0',
              color: 'var(--text-light)',
              fontSize: '1.5rem',
              letterSpacing: '1px',
              lineHeight: '1.6',
            }}
          >
            {order.menu_name.split(' ').map((word, index) => (
              <span key={index}>
                {word}
                {index < order.menu_name.split(' ').length - 1 && <br />}
              </span>
            ))}
          </h3>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              borderRadius: '4px',
              backgroundColor: getStatusColor(order.status),
              color: 'var(--bg-darker)',
              fontWeight: 'bold',
              fontSize: '1rem',
              border: '2px solid var(--border-gray)',
            }}
          >
            {getStatusText(order.status)}
          </div>
        </div>

        {/* 詳細情報（改札機風レシート表示） */}
        <div
          style={{
            marginTop: '30px',
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: 'var(--bg-darker)',
            borderRadius: '4px',
            border: '1px solid var(--border-gray)',
            fontFamily: 'monospace',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              borderBottom: '1px dashed var(--border-gray)',
              paddingBottom: '10px',
              marginBottom: '10px',
            }}
          >
            <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              RECEIPT
            </div>
          </div>
          <div
            style={{
              margin: '5px 0',
              color: 'var(--text-light)',
              fontSize: '0.9rem',
            }}
          >
            ORDER ID: {order.id}
          </div>
          <div
            style={{
              margin: '5px 0',
              color: 'var(--text-light)',
              fontSize: '0.9rem',
            }}
          >
            MENU ID: {order.menu_item_id}
          </div>
          <div
            style={{
              margin: '5px 0',
              color: 'var(--text-light)',
              fontSize: '0.9rem',
            }}
          >
            STATUS: {order.status.toUpperCase()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderReceipt;
