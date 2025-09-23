import React, { useEffect } from 'react';
import BaseMenuArea from './BaseMenuArea';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface UnselectingMenuAreaProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
}

const UnselectingMenuArea: React.FC<UnselectingMenuAreaProps> = ({
  menu,
  selectedItem,
  onItemSelect,
}) => {
  useEffect(() => {
    if (selectedItem) {
      const timer = setTimeout(() => {
        onItemSelect(null as any);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [selectedItem, onItemSelect]);

  return (
    <BaseMenuArea
      menu={menu}
      selectedItem={selectedItem}
      onItemSelect={onItemSelect}
    />
  );
};

export default UnselectingMenuArea;
