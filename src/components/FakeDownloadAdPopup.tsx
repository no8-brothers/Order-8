import React, { useState, useEffect } from 'react';

interface FakeDownloadAdPopupProps {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
}

const FakeDownloadAdPopup: React.FC<FakeDownloadAdPopupProps> = ({
  id,
  position,
  zIndex,
  onClose,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isDownloading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            alert('ウイルス.exe がダウンロードされました！');
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
      alert('ダウンロードをキャンセルできません！');
      setCurrentPosition({
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * (window.innerHeight - 220),
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
        width: '300px',
        height: '220px',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#2d2d2d',
        border: '2px solid #4CAF50',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        cursor: 'default',
        userSelect: 'none',
      }}
      onClick={() => {
        if (!isDownloading) {
          setCurrentPosition({
            x: Math.random() * (window.innerWidth - 300),
            y: Math.random() * (window.innerHeight - 220),
          });
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
            fontSize: '40px',
            marginBottom: '15px',
            filter: 'drop-shadow(0 0 5px #4CAF50)',
          }}
        >
          💾
        </div>

        <h3
          style={{
            margin: '0 0 10px 0',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#4CAF50',
          }}
        >
          無料ダウンロード
        </h3>

        <p
          style={{
            margin: '0 0 15px 0',
            fontSize: '12px',
            color: '#cccccc',
            lineHeight: '1.3',
          }}
        >
          最新のスーパーソフトウェア<br />
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
                fontSize: '11px',
                color: '#4CAF50',
              }}
            >
              ダウンロード中... {Math.floor(progress)}%
            </p>
          </div>
        ) : (
          <button
            onClick={startFakeDownload}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '25px',
              backgroundColor: '#4CAF50',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
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