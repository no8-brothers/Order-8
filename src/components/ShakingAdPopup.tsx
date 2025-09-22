import React, { useState, useEffect } from 'react';

interface ShakingAdPopupProps {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
}

const ShakingAdPopup: React.FC<ShakingAdPopupProps> = ({
  id,
  position,
  zIndex,
  onClose,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [isShaking, setIsShaking] = useState(true);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      if (isShaking) {
        setCurrentPosition(prev => ({
          x: prev.x + (Math.random() - 0.5) * 10,
          y: prev.y + (Math.random() - 0.5) * 10,
        }));
      }
    }, 50);

    return () => clearInterval(shakeInterval);
  }, [isShaking]);

  const handleFakeClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Math.random() < 0.1) {
      onClose();
    } else {
      alert('ウイルスが検出されました！今すぐスキャンしてください！');
      setCurrentPosition({
        x: Math.random() * (window.innerWidth - 280),
        y: Math.random() * (window.innerHeight - 200),
      });
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes virus-alert {
            0%, 100% {
              background-color: #990000;
              transform: scale(1);
            }
            50% {
              background-color: #ff0000;
              transform: scale(1.02);
            }
          }
          @keyframes urgent-blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.7; }
          }
        `}
      </style>
      <div
        style={{
          position: 'fixed',
          left: `${currentPosition.x}px`,
          top: `${currentPosition.y}px`,
          zIndex: zIndex,
          width: '280px',
          height: '200px',
          borderRadius: '8px',
          padding: '15px',
          border: '3px solid #ffff00',
          animation: 'virus-alert 0.3s infinite',
          boxShadow: '0 0 20px rgba(255, 0, 0, 0.8)',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => {
          alert('⚠️ 危険！このコンピュータがハッキングされています！');
          setCurrentPosition({
            x: Math.random() * (window.innerWidth - 280),
            y: Math.random() * (window.innerHeight - 200),
          });
        }}
      >
        <button
          onClick={handleFakeClose}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid #ffffff',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '30px',
              marginBottom: '10px',
              animation: 'urgent-blink 0.2s infinite',
            }}
          >
            ⚠️🦠⚠️
          </div>

          <h3
            style={{
              margin: '0 0 10px 0',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#ffffff',
              animation: 'urgent-blink 0.4s infinite',
            }}
          >
            緊急警告！
          </h3>

          <p
            style={{
              margin: '0 0 15px 0',
              fontSize: '12px',
              color: '#ffffff',
              lineHeight: '1.3',
            }}
          >
            あなたのコンピュータが<br />
            <strong style={{ color: '#ffff00' }}>37個のウイルス</strong>に感染しています！<br />
            今すぐ対処しないとデータが削除されます！
          </p>

          <button
            style={{
              padding: '8px 15px',
              border: 'none',
              borderRadius: '20px',
              backgroundColor: '#ffff00',
              color: '#000000',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              animation: 'urgent-blink 0.5s infinite',
            }}
            onClick={(e) => {
              e.stopPropagation();
              alert('偽ウイルス対策ソフトがダウンロードされました！');
            }}
          >
            🛡️ 今すぐ修復する！
          </button>
        </div>
      </div>
    </>
  );
};

export default ShakingAdPopup;