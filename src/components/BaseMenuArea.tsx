import React, { ReactNode } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface BaseMenuAreaProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
  className?: string;
  containerStyle?: React.CSSProperties;
  children?: ReactNode;
  renderItemContent?: (
    item: MenuItem,
    index: number
  ) => { name: string; description: string };
}

const BaseMenuArea: React.FC<BaseMenuAreaProps> = ({
  menu,
  selectedItem,
  onItemSelect,
  className = '',
  containerStyle = {},
  children,
  renderItemContent,
}) => {
  return (
    <div
      className={`exit-sign ${className}`}
      style={{
        marginBottom: '30px',
        padding: '15px',
        ...containerStyle,
      }}
    >
      {children}
      <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
        {menu.map((item, index) => {
          const isSelected = selectedItem && selectedItem.id === item.id;
          const content = renderItemContent
            ? renderItemContent(item, index)
            : { name: item.name, description: item.description };

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
                padding: '20px 12px',
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
                  {content.name}
                </h3>
                <p
                  style={{
                    margin: '0',
                    color: 'var(--text-dim)',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                  }}
                >
                  {content.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BaseMenuArea;
