import React from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface MisreadingProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
}

const MisreadingMenuArea: React.FC<MisreadingProps> = ({
  menu,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <div style={{ marginBottom: '30px', padding: '25px' }}>
      
      <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
        {menu.map((item, index) => {
          const isSelected = selectedItem && selectedItem.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onItemSelect(item)}
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
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {/* 番号 */}
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

export default MisreadingMenuArea;
