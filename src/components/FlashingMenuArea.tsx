import React from 'react';
import BaseMenuArea from './BaseMenuArea';

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
    <BaseMenuArea
      menu={menu}
      selectedItem={selectedItem}
      onItemSelect={onItemSelect}
      containerStyle={{
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
    </BaseMenuArea>
  );
};

export default FlashingMenuArea;
