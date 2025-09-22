import React, { useState } from 'react';

interface SurveyAdPopupProps {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
}

const SurveyAdPopup: React.FC<SurveyAdPopupProps> = ({
  id,
  position,
  zIndex,
  onClose,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [step, setStep] = useState(0);

  const questions = [
    "年齢を教えてください",
    "年収を教えてください",
    "クレジットカード番号を教えてください",
    "母親の旧姓を教えてください",
    "ペットの名前を教えてください"
  ];

  const handleFakeClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Math.random() < 0.05) {
      onClose();
    } else {
      alert('アンケートを完了してから閉じてください！');
      setCurrentPosition({
        x: Math.random() * (window.innerWidth - 350),
        y: Math.random() * (window.innerHeight - 280),
      });
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      alert('アンケートありがとうございました！あなたの個人情報を販売します！');
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
        width: '350px',
        height: '280px',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#0066cc',
        border: '2px solid #ffffff',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        cursor: 'default',
        userSelect: 'none',
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
            margin: '0 0 15px 0',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          📊 簡単アンケート
        </h3>

        <p
          style={{
            margin: '0 0 10px 0',
            fontSize: '12px',
            color: '#ccddff',
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
            marginBottom: '20px',
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
            margin: '0 0 20px 0',
            fontSize: '14px',
            color: '#ffffff',
            lineHeight: '1.4',
          }}
        >
          {questions[step]}
        </p>

        <input
          type="text"
          placeholder="こちらに入力してください..."
          style={{
            width: '80%',
            padding: '8px 12px',
            marginBottom: '15px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        />

        <button
          onClick={handleNext}
          style={{
            padding: '10px 25px',
            border: 'none',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            color: '#0066cc',
            fontSize: '14px',
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