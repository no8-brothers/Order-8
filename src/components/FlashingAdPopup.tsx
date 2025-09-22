import React, { useState } from 'react';

interface FlashingAdPopupProps {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
  onForceReturnToZero?: () => void;
}

const FlashingAdPopup: React.FC<FlashingAdPopupProps> = ({
  id,
  position,
  zIndex,
  onClose,
  onForceReturnToZero,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);

  const handleFakeClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Math.random() < 0.2) {
      onClose();
    } else {
      setCurrentPosition({
        x: Math.random() * Math.max(100, window.innerWidth - 300),
        y: Math.random() * Math.max(100, window.innerHeight - 200),
      });
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes disco-flash {
            0% { background: linear-gradient(45deg, #ff0080, #0080ff); }
            20% { background: linear-gradient(45deg, #80ff00, #ff8000); }
            40% { background: linear-gradient(45deg, #ff0000, #00ff80); }
            60% { background: linear-gradient(45deg, #8000ff, #ffff00); }
            80% { background: linear-gradient(45deg, #00ffff, #ff0040); }
            100% { background: linear-gradient(45deg, #ff0080, #0080ff); }
          }
          @keyframes text-glow {
            0%, 100% { text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff; }
            50% { text-shadow: 0 0 20px #ffff00, 0 0 30px #ffff00, 0 0 40px #ffff00; }
          }
        `}
      </style>
      <div
        style={{
          position: 'fixed',
          left: `${currentPosition.x}px`,
          top: `${currentPosition.y}px`,
          zIndex: zIndex,
          width: 'clamp(250px, 25vw, 380px)',
          height: 'clamp(180px, 20vh, 280px)',
          borderRadius: '12px',
          padding: 'clamp(10px, 1.5vw, 20px)',
          border: '4px solid #ffff00',
          animation: 'disco-flash 0.5s infinite',
          boxShadow: '0 0 30px rgba(255, 255, 0, 0.8)',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => {
          alert('広告をクリックしました！残念ですが0番注文口に戻ります。');
          if (onForceReturnToZero) {
            onForceReturnToZero();
          }
        }}
      >
        <button
          onClick={handleFakeClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid #ffffff',
            backgroundColor: '#ff0000',
            color: '#ffffff',
            fontSize: '14px',
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
          <h2
            style={{
              margin: '0 0 clamp(8px, 1.5vh, 15px) 0',
              fontSize: 'clamp(14px, 3.5vw, 20px)',
              fontWeight: 'bold',
              color: '#ffffff',
              animation: 'text-glow 1s infinite',
              textAlign: 'center',
            }}
          >
            🎉 1000万円当選！！ 🎉
          </h2>

          <p
            style={{
              margin: '0 0 clamp(8px, 1.5vh, 15px) 0',
              fontSize: 'clamp(10px, 2.2vw, 14px)',
              color: '#ffffff',
              lineHeight: '1.3',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            おめでとうございます！
            <br />
            あなたが選ばれました！
            <br />
            今すぐクリックして賞金を受け取ってください！
          </p>

          <button
            style={{
              padding: 'clamp(6px, 1.2vh, 12px) clamp(12px, 3vw, 20px)',
              border: 'none',
              borderRadius: 'clamp(15px, 3vw, 25px)',
              backgroundColor: '#00ff00',
              color: '#000000',
              fontSize: 'clamp(10px, 2.2vw, 14px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              animation: 'disco-flash 0.3s infinite',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)',
              width: 'fit-content',
              margin: '0 auto',
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (onForceReturnToZero) {
                onForceReturnToZero();
              }
            }}
          >
            💰 今すぐ受け取る！ 💰
          </button>
        </div>
      </div>
    </>
  );
};

export default FlashingAdPopup;
