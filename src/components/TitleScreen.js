import React from 'react';

function TitleScreen({ onStartOrder }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 140px)',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ fontSize: '120px', marginBottom: '20px' }}>🍧</div>
        <h1
          style={{
            fontSize: '2.5rem',
            color: '#333',
            marginBottom: '20px',
            fontWeight: 'bold',
          }}
        >
          かき氷注文システム
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '40px',
            lineHeight: '1.6',
          }}
        >
          技育祭特別企画<br />
          ラムダ技術部コラボハッカソン
        </p>
        <button
          onClick={onStartOrder}
          style={{
            fontSize: '1.5rem',
            padding: '20px 40px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,123,255,0.3)',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
          }}
        >
          タップして注文を開始
        </button>
      </div>
    </div>
  );
}

export default TitleScreen;