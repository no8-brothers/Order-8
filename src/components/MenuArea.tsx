import React from 'react';
import BaseMenuArea from './BaseMenuArea';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface MenuAreaProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
}

const MenuArea: React.FC<MenuAreaProps> = ({
  menu,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <BaseMenuArea
      menu={menu}
      selectedItem={selectedItem}
      onItemSelect={onItemSelect}
    />
  );
};

export default MenuArea;
