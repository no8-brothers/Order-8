import React, { useState } from 'react';

interface SurveyAdPopupProps {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
  onForceReturnToZero?: () => void;
}

const SurveyAdPopup: React.FC<SurveyAdPopupProps> = ({
  id,
  position,
  zIndex,
  onClose,
  onForceReturnToZero,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [step, setStep] = useState(0);

  const questions = [
    '年齢を教えてください',
    '年収を教えてください',
    'クレジットカード番号を教えてください',
    '母親の旧姓を教えてください',
    'ペットの名前を教えてください',
  ];

  const handleFakeClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Math.random() < 0.05) {
      onClose();
    } else {
      setCurrentPosition({
        x: Math.random() * Math.max(100, window.innerWidth - 350),
        y: Math.random() * Math.max(100, window.innerHeight - 250),
      });
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      if (onForceReturnToZero) {
        onForceReturnToZero();
      }
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
        zIndex: zIndex,
        width: 'clamp(280px, 28vw, 400px)',
        height: 'clamp(220px, 25vh, 320px)',
        borderRadius: '10px',
        padding: 'clamp(15px, 2vw, 25px)',
        backgroundColor: '#0066cc',
        border: '2px solid #ffffff',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
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
          top: '10px',
          right: '10px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: '#ffffff',
          color: '#0066cc',
          fontSize: '16px',
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
        <h3
          style={{
            margin: '0 0 clamp(8px, 1.5vh, 15px) 0',
            fontSize: 'clamp(14px, 3.2vw, 18px)',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          📊 簡単アンケート
        </h3>

        <p
          style={{
            margin: '0 0 clamp(6px, 1vh, 10px) 0',
            fontSize: 'clamp(10px, 2vw, 12px)',
            color: '#ccddff',
            textAlign: 'center',
          }}
        >
          質問 {step + 1} / {questions.length}
        </p>

        <div
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#003d80',
            borderRadius: '2px',
            marginBottom: 'clamp(12px, 2vh, 20px)',
          }}
        >
          <div
            style={{
              width: `${((step + 1) / questions.length) * 100}%`,
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              transition: 'width 0.3s',
            }}
          />
        </div>

        <p
          style={{
            margin: '0 0 clamp(12px, 2vh, 20px) 0',
            fontSize: 'clamp(11px, 2.5vw, 14px)',
            color: '#ffffff',
            lineHeight: '1.3',
            textAlign: 'center',
          }}
        >
          {questions[step]}
        </p>

        <input
          type="text"
          placeholder="こちらに入力してください..."
          style={{
            width: 'clamp(200px, 75%, 280px)',
            padding: 'clamp(6px, 1vh, 8px) clamp(8px, 2vw, 12px)',
            marginBottom: 'clamp(10px, 1.5vh, 15px)',
            border: 'none',
            borderRadius: '4px',
            fontSize: 'clamp(10px, 2.2vw, 12px)',
          }}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          style={{
            padding: 'clamp(6px, 1.2vh, 10px) clamp(15px, 4vw, 25px)',
            border: 'none',
            borderRadius: 'clamp(12px, 2.5vw, 20px)',
            backgroundColor: '#ffffff',
            color: '#0066cc',
            fontSize: 'clamp(10px, 2.2vw, 14px)',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {step < questions.length - 1 ? '次へ →' : '完了'}
        </button>
      </div>
    </div>
  );
};

export default SurveyAdPopup;
