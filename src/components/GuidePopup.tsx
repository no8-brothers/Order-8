import React from 'react';

interface GuidePopupProps {
  isVisible: boolean;
  isExpanded: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const GuidePopup: React.FC<GuidePopupProps> = ({ isVisible, isExpanded, onClose, onToggle }) => {
  if (!isVisible) return null;

  return (
    <>
      {/* 背景オーバーレイ（拡大時のみ） */}
      {isExpanded && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 999,
          }}
          onClick={onClose}
        />
      )}

      {/* ガイドコンポーネント */}
      {!isExpanded && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #ffff00, #ffeb3b, #fff59d, #ffff00, #ffd700, #ffff00)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 0, 0.3), 0 0 20px rgba(255, 235, 59, 0.2)',
          }}
          onClick={onToggle}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ご案内
          </div>
        </div>
      )}

      {isExpanded && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            right: '50%',
            transform: 'translate(50%, -50%)',
            zIndex: 1000,
            cursor: 'default',
          }}
        >
          <div
            style={{
              backgroundColor: '#e8e8e8',
              border: 'clamp(4px, 1vw, 8px) solid #888',
              borderRadius: '0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              padding: '0',
              width: 'clamp(280px, 90vw, 700px)',
              position: 'relative',
              fontFamily: 'monospace',
            }}
            onClick={(e) => e.stopPropagation()}
          >
          {/* タイトルバー（黒背景） */}
          <div
            style={{
              backgroundColor: '#333',
              color: 'white',
              padding: 'clamp(8px, 2vw, 16px) clamp(12px, 3vw, 24px)',
              fontSize: 'clamp(1rem, 3vw, 1.6rem)',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '0',
            }}
          >
            ご案内 Guide
          </div>

          {/* 内容エリア */}
          {isExpanded && (
            <div
              style={{
                padding: 'clamp(16px, 4vw, 32px)',
                fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
                lineHeight: '1.8',
                color: '#333',
                backgroundColor: '#e8e8e8',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <strong>異変を見逃さないこと</strong><br />
                <span style={{ fontSize: 'clamp(0.7rem, 2vw, 0.95rem)', color: '#666' }}>Don't overlook any anomalies.</span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <strong>異変を見つけたら、すぐに引き返すこと</strong><br />
                <span style={{ fontSize: 'clamp(0.7rem, 2vw, 0.95rem)', color: '#666' }}>If you find anomalies, turn back immediately.</span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <strong>異変が見つからなかったら、引き返さないこと</strong><br />
                <span style={{ fontSize: 'clamp(0.7rem, 2vw, 0.95rem)', color: '#666' }}>If you don't find anomalies, do not turn back.</span>
              </div>

              <div style={{ marginBottom: '0' }}>
                <strong>8番注文口でかき氷を注文すること</strong><br />
                <span style={{ fontSize: 'clamp(0.7rem, 2vw, 0.95rem)', color: '#666' }}>Order shaved ice at Counter 8.</span>
              </div>
            </div>
          )}
          </div>
        </div>
      )}
    </>
  );
};

export default GuidePopup;