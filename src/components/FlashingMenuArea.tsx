import React from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface FlashingMenuAreaProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
}

const FlashingMenuArea: React.FC<FlashingMenuAreaProps> = ({
  menu,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <div
      className="exit-sign"
      style={{
        marginBottom: '30px',
        padding: '25px',
        animation: 'flicker 0.15s infinite linear',
      }}
    >
      <style>
        {`
          @keyframes flicker {
            0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
              opacity: 1;
            }

            20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
              opacity: 0.3;
            }
          }
        `}
      </style>
      <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
        {menu.map((item, index) => {
          const isSelected = selectedItem && selectedItem.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onItemSelect(item)}
              className={isSelected ? 'fluorescent-light' : ''}
              style={{
                border: isSelected
                  ? '2px solid var(--accent-yellow)'
                  : '1px solid var(--border-gray)',
                borderRadius: '4px',
                padding: '20px',
                backgroundColor: isSelected
                  ? 'var(--bg-tile)'
                  : 'var(--bg-darker)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {/* 路線図風の番号 */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isSelected
                    ? 'var(--accent-yellow)'
                    : 'var(--border-gray)',
                  color: isSelected ? 'var(--bg-darker)' : 'var(--text-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    color: 'var(--text-light)',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    margin: '0',
                    color: 'var(--text-dim)',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlashingMenuArea;