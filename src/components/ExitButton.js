import React from 'react';

const ExitButton = ({ 
  onClick, 
  children, 
  disabled = false, 
  variant = 'default',
  size = 'medium'
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      border: '2px solid',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'inherit',
      fontWeight: 'bold',
      letterSpacing: '1px',
      transition: 'all 0.3s ease',
    };

    const sizes = {
      small: { padding: '10px 20px', fontSize: '0.9rem' },
      medium: { padding: '15px 25px', fontSize: '1rem' },
      large: { padding: '15px 30px', fontSize: '1.1rem' },
    };

    const variants = {
      default: {
        backgroundColor: disabled ? 'var(--border-gray)' : 'var(--bg-darker)',
        color: disabled ? 'var(--text-dim)' : 'var(--accent-yellow)',
        borderColor: disabled ? 'var(--border-gray)' : 'var(--accent-yellow)',
        opacity: disabled ? 0.5 : 1,
      },
      primary: {
        backgroundColor: disabled ? 'var(--border-gray)' : 'var(--bg-darker)',
        color: disabled ? 'var(--text-dim)' : 'var(--accent-yellow)',
        borderColor: disabled ? 'var(--border-gray)' : 'var(--accent-yellow)',
        opacity: disabled ? 0.5 : 1,
      },
      danger: {
        backgroundColor: 'var(--bg-darker)',
        color: '#ff6b6b',
        borderColor: '#ff6b6b',
      },
    };

    return {
      ...baseStyles,
      ...sizes[size],
      ...variants[variant],
    };
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={getButtonStyles()}
    >
      {children}
    </button>
  );
};

export default ExitButton;