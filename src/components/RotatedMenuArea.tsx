import React, { useState, useEffect } from 'react';
import BaseMenuArea from './BaseMenuArea';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface RotatedMenuAreaProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
}

const RotatedMenuArea: React.FC<RotatedMenuAreaProps> = ({
  menu,
  selectedItem,
  onItemSelect,
}) => {
  const [isRotated, setIsRotated] = useState(false);

  // 商品が選択された時に回転、選択解除時にリセット
  useEffect(() => {
    if (selectedItem) {
      setIsRotated(true);
    } else {
      setIsRotated(false);
    }
  }, [selectedItem]);

  return (
    <BaseMenuArea
      menu={menu}
      selectedItem={selectedItem}
      onItemSelect={onItemSelect}
      className="rotated-menu-area"
      containerStyle={{
        transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 1.5s ease-in-out',
        transformOrigin: 'center center',
      }}
    >
      <style>
        {`
          .rotated-menu-area::before {
            display: none !important;
          }
        `}
      </style>
    </BaseMenuArea>
  );
};

export default RotatedMenuArea;
