import React, { useState, useEffect } from 'react';

interface RobotVerificationProps {
  isVisible: boolean;
  onVerified: () => void;
  onCancel: () => void;
}

const RobotVerification: React.FC<RobotVerificationProps> = ({
  isVisible,
  onVerified,
  onCancel,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setIsChecked(false);
      setIsLoading(false);
    }
  }, [isVisible]);

  const handleCheckboxChange = () => {
    if (!isChecked) {
      setIsLoading(true);
      // 少し遅延を入れてリアルな感じを演出
      setTimeout(() => {
        setIsLoading(false);
        setIsChecked(true);
        // さらに少し待ってから検証完了
        setTimeout(() => {
          onVerified();
        }, 500);
      }, 1500);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="exit-sign"
        style={{
          padding: '30px',
          maxWidth: '400px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <h3
          style={{
            color: 'var(--text-light)',
            marginBottom: '20px',
            fontSize: '1.2rem',
            letterSpacing: '1px',
          }}
        >
          注文口に並びますか？
        </h3>

        <div
          style={{
            border: '2px solid var(--border-gray)',
            borderRadius: '4px',
            padding: '20px',
            backgroundColor: 'var(--bg-darker)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderColor: isChecked
              ? 'var(--accent-yellow)'
              : 'var(--border-gray)',
          }}
          onClick={handleCheckboxChange}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '2px solid var(--border-gray)',
              borderRadius: '3px',
              backgroundColor: isChecked
                ? 'var(--accent-yellow)'
                : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: 'var(--bg-darker)',
              fontWeight: 'bold',
            }}
          >
            {isLoading ? (
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  border: '2px solid var(--text-dim)',
                  borderTop: '2px solid var(--accent-yellow)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            ) : isChecked ? (
              '✓'
            ) : null}
          </div>

          <span
            style={{
              color: 'var(--text-light)',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          >
            I'm not a robot
          </span>
        </div>

        <button
          onClick={onCancel}
          style={{
            backgroundColor: 'var(--border-gray)',
            color: 'var(--text-light)',
            border: '2px solid var(--border-gray)',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontFamily: 'inherit',
            fontWeight: 'bold',
          }}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default RobotVerification;
