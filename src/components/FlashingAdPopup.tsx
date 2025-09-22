import React, { useState } from 'react';

interface FlashingAdPopupProps {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
}

const FlashingAdPopup: React.FC<FlashingAdPopupProps> = ({
  id,
  position,
  zIndex,
  onClose,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);

  const handleFakeClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Math.random() < 0.2) {
      onClose();
    } else {
      setCurrentPosition({
        x: Math.random() * (window.innerWidth - 320),
        y: Math.random() * (window.innerHeight - 240),
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
          width: '320px',
          height: '240px',
          borderRadius: '12px',
          padding: '15px',
          border: '4px solid #ffff00',
          animation: 'disco-flash 0.5s infinite',
          boxShadow: '0 0 30px rgba(255, 255, 0, 0.8)',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => {
          setCurrentPosition({
            x: Math.random() * (window.innerWidth - 320),
            y: Math.random() * (window.innerHeight - 240),
          });
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
              margin: '0 0 15px 0',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#ffffff',
              animation: 'text-glow 1s infinite',
            }}
          >
            🎉 1000万円当選！！ 🎉
          </h2>

          <p
            style={{
              margin: '0 0 15px 0',
              fontSize: '14px',
              color: '#ffffff',
              lineHeight: '1.4',
              fontWeight: 'bold',
            }}
          >
            おめでとうございます！<br />
            あなたが選ばれました！<br />
            今すぐクリックして賞金を受け取ってください！
          </p>

          <button
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '25px',
              backgroundColor: '#00ff00',
              color: '#000000',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              animation: 'disco-flash 0.3s infinite',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              alert('詐欺サイトに誘導されました！おめでとうございます！');
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