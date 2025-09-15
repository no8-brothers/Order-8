import React from 'react';

const ExitSign = ({ exitNumber, size = 'medium' }) => {
  const getSizeStyles = () => {
    const sizes = {
      small: { padding: '8px 16px', fontSize: '0.9rem', letterSpacing: '1px' },
      medium: {
        padding: '16px 32px',
        fontSize: '1.4rem',
        letterSpacing: '2px',
      },
      large: { padding: '20px 40px', fontSize: '1.8rem', letterSpacing: '3px' },
    };
    return sizes[size];
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--accent-yellow)',
        color: 'var(--bg-darker)',
        borderRadius: '6px',
        fontWeight: 'bold',
        border: '3px solid var(--border-gray)',
        display: 'inline-block',
        ...getSizeStyles(),
      }}
    >
      {exitNumber}番注文口
    </div>
  );
};

export default ExitSign;
