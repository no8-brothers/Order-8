import React, { useState, useEffect } from 'react';

interface MovingAdPopupProps {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
  onForceReturnToZero?: () => void;
}

const MovingAdPopup: React.FC<MovingAdPopupProps> = ({
  id,
  position,
  zIndex,
  onClose,
  onForceReturnToZero,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [direction, setDirection] = useState({
    x: (Math.random() - 0.5) * 4, // -2 to 2
    y: (Math.random() - 0.5) * 4,
  });

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCurrentPosition((prev) => {
        let newX = prev.x + direction.x;
        let newY = prev.y + direction.y;

        // 画面端での跳ね返り
        const adWidth = Math.min(350, Math.max(240, window.innerWidth * 0.24));
        if (newX <= 0 || newX >= window.innerWidth - adWidth) {
          setDirection((prev) => ({ ...prev, x: -prev.x }));
          newX = Math.max(0, Math.min(window.innerWidth - adWidth, newX));
        }
        const adHeight = Math.min(
          240,
          Math.max(160, window.innerHeight * 0.18)
        );
        if (newY <= 0 || newY >= window.innerHeight - adHeight) {
          setDirection((prev) => ({ ...prev, y: -prev.y }));
          newY = Math.max(0, Math.min(window.innerHeight - adHeight, newY));
        }

        // ランダムに方向を少し変える
        if (Math.random() < 0.02) {
          // 2%の確率で方向変更
          setDirection((prev) => ({
            x: prev.x + (Math.random() - 0.5) * 2,
            y: prev.y + (Math.random() - 0.5) * 2,
          }));
        }

        return { x: newX, y: newY };
      });
    }, 50); // 50ms間隔でスムーズに移動

    return () => clearInterval(moveInterval);
  }, [direction]);

  const handleFakeClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Math.random() < 0.1) {
      onClose();
    } else {
      // 逃げるように高速移動
      setDirection({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
      });
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes neon-glow {
            0%, 100% {
              box-shadow: 0 0 5px #ff1493, 0 0 10px #ff1493, 0 0 15px #ff1493;
            }
            50% {
              box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
            }
          }
          @keyframes text-rainbow {
            0% { color: #ff0000; }
            16% { color: #ff8000; }
            33% { color: #ffff00; }
            50% { color: #00ff00; }
            66% { color: #0080ff; }
            83% { color: #8000ff; }
            100% { color: #ff0000; }
          }
        `}
      </style>
      <div
        style={{
          position: 'fixed',
          left: `${currentPosition.x}px`,
          top: `${currentPosition.y}px`,
          zIndex: zIndex,
          width: 'clamp(240px, 24vw, 350px)',
          height: 'clamp(160px, 18vh, 240px)',
          borderRadius: '15px',
          padding: 'clamp(12px, 1.5vw, 20px)',
          background:
            'linear-gradient(45deg, #ff1493, #00bfff, #32cd32, #ffa500)',
          backgroundSize: '400% 400%',
          animation: 'neon-glow 1s infinite, gradient-shift 2s ease infinite',
          border: '3px solid #ffffff',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'none', // スムーズな移動のため
        }}
        onClick={() => {
          if (onForceReturnToZero) {
            onForceReturnToZero();
          }
        }}
      >
        <style>
          {`
            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>

        <button
          onClick={handleFakeClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: 'none',
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
          <div
            style={{
              fontSize: 'clamp(20px, 4vw, 32px)',
              marginBottom: 'clamp(6px, 1.2vh, 10px)',
              animation: 'text-rainbow 1s infinite',
            }}
          >
            👆🎯👆
          </div>

          <h3
            style={{
              margin: '0 0 clamp(6px, 1.2vh, 10px) 0',
              fontSize: 'clamp(12px, 3vw, 16px)',
              fontWeight: 'bold',
              color: '#ffffff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              animation: 'text-rainbow 2s infinite',
              textAlign: 'center',
            }}
          >
            🎰 カジノ大当り！ 🎰
          </h3>

          <p
            style={{
              margin: '0 0 clamp(8px, 1.5vh, 15px) 0',
              fontSize: 'clamp(9px, 2vw, 12px)',
              color: '#ffffff',
              lineHeight: '1.2',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
          >
            今なら無料で100万円！
            <br />
            登録不要・即日入金可能！
            <br />
            限定オファー残り3分！
          </p>

          <button
            style={{
              padding: 'clamp(5px, 1vh, 8px) clamp(10px, 2.5vw, 15px)',
              border: 'none',
              borderRadius: 'clamp(12px, 2.5vw, 20px)',
              backgroundColor: '#ffffff',
              color: '#ff1493',
              fontSize: 'clamp(9px, 2vw, 12px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: 'text-rainbow 1.5s infinite',
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
            💰 今すぐGET！
          </button>
        </div>
      </div>
    </>
  );
};

export default MovingAdPopup;
