import React, { useState, useEffect } from 'react';

interface FakeDownloadAdPopupProps {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
  onForceReturnToZero?: () => void;
}

const FakeDownloadAdPopup: React.FC<FakeDownloadAdPopupProps> = ({
  id,
  position,
  zIndex,
  onClose,
  onForceReturnToZero,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isDownloading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            if (onForceReturnToZero) {
              onForceReturnToZero();
            }
            setIsDownloading(false);
            setProgress(0);
            return 0;
          }
          return prev + Math.random() * 3;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isDownloading]);

  const handleFakeClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Math.random() < 0.15) {
      onClose();
    } else {
      setCurrentPosition({
        x: Math.random() * Math.max(100, window.innerWidth - 280),
        y: Math.random() * Math.max(100, window.innerHeight - 200),
      });
    }
  };

  const startFakeDownload = () => {
    setIsDownloading(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
        zIndex: zIndex,
        width: 'clamp(240px, 24vw, 350px)',
        height: 'clamp(180px, 20vh, 260px)',
        borderRadius: '8px',
        padding: 'clamp(12px, 1.5vw, 20px)',
        backgroundColor: '#2d2d2d',
        border: '2px solid #4CAF50',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        cursor: 'default',
        userSelect: 'none',
      }}
      onClick={() => {
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
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#ff4444',
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
            fontSize: 'clamp(25px, 5vw, 40px)',
            marginBottom: 'clamp(8px, 1.5vh, 15px)',
            filter: 'drop-shadow(0 0 5px #4CAF50)',
          }}
        >
          💾
        </div>

        <h3
          style={{
            margin: '0 0 clamp(6px, 1.2vh, 10px) 0',
            fontSize: 'clamp(12px, 3vw, 16px)',
            fontWeight: 'bold',
            color: '#4CAF50',
            textAlign: 'center',
          }}
        >
          無料ダウンロード
        </h3>

        <p
          style={{
            margin: '0 0 clamp(8px, 1.5vh, 15px) 0',
            fontSize: 'clamp(9px, 2vw, 12px)',
            color: '#cccccc',
            lineHeight: '1.2',
            textAlign: 'center',
          }}
        >
          最新のスーパーソフトウェア
          <br />
          完全無料・高機能・今だけ限定！
        </p>

        {isDownloading ? (
          <div style={{ width: '100%' }}>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#555555',
                borderRadius: '10px',
                marginBottom: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#4CAF50',
                  borderRadius: '10px',
                  transition: 'width 0.1s',
                }}
              />
            </div>
            <p
              style={{
                margin: '0',
                fontSize: 'clamp(8px, 1.8vw, 11px)',
                color: '#4CAF50',
                textAlign: 'center',
              }}
            >
              ダウンロード中... {Math.floor(progress)}%
            </p>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              startFakeDownload();
            }}
            style={{
              padding: 'clamp(6px, 1.2vh, 10px) clamp(12px, 3vw, 20px)',
              border: 'none',
              borderRadius: 'clamp(15px, 3vw, 25px)',
              backgroundColor: '#4CAF50',
              color: '#ffffff',
              fontSize: 'clamp(10px, 2.2vw, 14px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
              width: 'fit-content',
              margin: '0 auto',
            }}
          >
            📥 今すぐダウンロード
          </button>
        )}
      </div>
    </div>
  );
};

export default FakeDownloadAdPopup;
