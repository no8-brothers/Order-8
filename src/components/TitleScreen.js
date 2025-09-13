import React, { useState } from 'react';
import RobotVerification from './RobotVerification';

function TitleScreen({ onStartOrder }) {
  const [showRobotCheck, setShowRobotCheck] = useState(false);

  const handleStartClick = () => {
    setShowRobotCheck(true);
  };

  const handleRobotVerified = () => {
    setShowRobotCheck(false);
    onStartOrder();
  };

  const handleRobotCancel = () => {
    setShowRobotCheck(false);
  };

  return (
    <div
      className="underground-bg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 140px)',
        padding: '20px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* 蛍光灯効果 */}
      <div
        className="fluorescent-light"
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '4px',
          background: 'linear-gradient(to right, transparent, var(--accent-yellow), transparent)',
          borderRadius: '2px',
        }}
      />

      <div
        className="exit-sign"
        style={{
          maxWidth: '600px',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--accent-yellow)',
            color: 'var(--bg-darker)',
            padding: '20px 40px',
            borderRadius: '6px',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            border: '4px solid var(--border-gray)',
            letterSpacing: '3px',
            marginBottom: '20px',
            display: 'inline-block',
          }}
        >
          8番注文口
        </div>
        
        <h1
          style={{
            fontSize: '1.5rem',
            color: 'var(--text-light)',
            marginBottom: '10px',
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}
        >
          かき氷注文システム
        </h1>
        
        <div
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-dim)',
            marginBottom: '30px',
            padding: '10px',
            border: '1px solid var(--border-gray)',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-darker)',
          }}
        >
          技育祭特別企画 - ラムダ技術部コラボハッカソン
        </div>

        <button
          onClick={handleStartClick}
          style={{
            fontSize: '1.2rem',
            padding: '12px 60px',
            backgroundColor: 'var(--bg-darker)',
            color: 'var(--accent-yellow)',
            border: '2px solid var(--accent-yellow)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 'bold',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            lineHeight: '1.4',
            minWidth: '220px',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--accent-yellow)';
            e.target.style.color = 'var(--bg-darker)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--bg-darker)';
            e.target.style.color = 'var(--accent-yellow)';
          }}
        >
          タップして<br />注文を開始
        </button>
      </div>

      <RobotVerification
        isVisible={showRobotCheck}
        onVerified={handleRobotVerified}
        onCancel={handleRobotCancel}
      />
    </div>
  );
}

export default TitleScreen;