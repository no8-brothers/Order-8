import React, { useState, useEffect } from 'react';

interface GrowingAdPopupProps {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
  onForceReturnToZero?: () => void;
}

const GrowingAdPopup: React.FC<GrowingAdPopupProps> = ({
  id,
  position,
  zIndex,
  onClose,
  onForceReturnToZero,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0.9);

  useEffect(() => {
    const growInterval = setInterval(() => {
      setScale((prev) => Math.min(prev + 0.02, 3));
      setOpacity((prev) => Math.max(prev - 0.005, 0.7));
    }, 100);

    return () => clearInterval(growInterval);
  }, []);

  const handleFakeClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Math.random() < 0.08) {
      onClose();
    } else {
      setScale((prev) => prev + 0.2);
      alert('閉じることはできません！広告を見続けてください！');
    }
  };

  const handleClick = () => {
    setScale((prev) => prev + 0.3);
    setCurrentPosition({
      x: Math.max(
        0,
        Math.min(
          window.innerWidth - 200 * scale,
          Math.random() * window.innerWidth
        )
      ),
      y: Math.max(
        0,
        Math.min(
          window.innerHeight - 180 * scale,
          Math.random() * window.innerHeight
        )
      ),
    });
    alert('クリックするたびに広告が大きくなります！');
  };

  return (
    <>
      <style>
        {`
          @keyframes rainbow-border {
            0% { border-color: #ff0000; }
            16% { border-color: #ff8000; }
            33% { border-color: #ffff00; }
            50% { border-color: #00ff00; }
            66% { border-color: #0080ff; }
            83% { border-color: #8000ff; }
            100% { border-color: #ff0000; }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg) scale(${scale}); }
            to { transform: rotate(360deg) scale(${scale}); }
          }
        `}
      </style>
      <div
        style={{
          position: 'fixed',
          left: `${currentPosition.x}px`,
          top: `${currentPosition.y}px`,
          zIndex: zIndex,
          width: `${200 * scale}px`,
          height: `${180 * scale}px`,
          borderRadius: '15px',
          padding: `${15 * scale}px`,
          background:
            'linear-gradient(45deg, #ff6b35, #f7931e, #ffcc02, #8bc34a)',
          border: '4px solid',
          animation:
            'rainbow-border 2s infinite, spin-slow 10s infinite linear',
          boxShadow: `0 0 ${30 * scale}px rgba(255, 107, 53, 0.8)`,
          cursor: 'pointer',
          userSelect: 'none',
          opacity: opacity,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transition: 'transform 0.3s ease',
        }}
        onClick={handleClick}
      >
        <button
          onClick={handleFakeClose}
          style={{
            position: 'absolute',
            top: `${8 / scale}px`,
            right: `${8 / scale}px`,
            width: `${24 / scale}px`,
            height: `${24 / scale}px`,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontSize: `${14 / scale}px`,
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
              fontSize: `${40 / scale}px`,
              marginBottom: `${10 / scale}px`,
            }}
          >
            🔥💎🔥
          </div>

          <h3
            style={{
              margin: `0 0 ${10 / scale}px 0`,
              fontSize: `${16 / scale}px`,
              fontWeight: 'bold',
              color: '#ffffff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            }}
          >
            超特価セール！
          </h3>

          <p
            style={{
              margin: `0 0 ${15 / scale}px 0`,
              fontSize: `${12 / scale}px`,
              color: '#ffffff',
              lineHeight: '1.3',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
            }}
          >
            今だけ99%OFF！
            <br />
            このチャンスを逃すな！
            <br />
            クリックで詳細確認！
          </p>

          <button
            style={{
              padding: `${8 / scale}px ${15 / scale}px`,
              border: 'none',
              borderRadius: `${20 / scale}px`,
              backgroundColor: '#ffffff',
              color: '#ff6b35',
              fontSize: `${12 / scale}px`,
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setScale((prev) => prev + 0.5);
              if (onForceReturnToZero) {
                onForceReturnToZero();
              }
            }}
          >
            🛒 今すぐ購入！
          </button>
        </div>
      </div>
    </>
  );
};

export default GrowingAdPopup;
