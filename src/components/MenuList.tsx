import React, { useState, useEffect } from 'react';
import { kakigoriApi } from '../api/client';
import ExitButton from './ExitButton';
import ExitSign from './ExitSign';
import MenuArea from './MenuArea';
import FlashingMenuArea from './FlashingMenuArea';
import { orderStorage } from '../utils/orderStorage';

interface MenuListProps {
  onOrderCreate: (order: any) => void;
  onBackToPreviousExit: () => void;
  currentOrderCounter: number;
  onMoveToNextCounter: () => void;
  onMoveToPreviousCounter: () => void;
  onForceReturnToZero: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

const MenuList: React.FC<MenuListProps> = ({
  onOrderCreate,
  onBackToPreviousExit,
  currentOrderCounter,
  onMoveToNextCounter,
  onMoveToPreviousCounter,
  onForceReturnToZero,
}) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [currentMenuAreaId, setCurrentMenuAreaId] = useState<number>(0);

  useEffect(() => {
    setSelectedItem(null);
  }, [currentOrderCounter]);

  useEffect(() => {
    const menuAreaId = orderStorage.getCurrentMenuAreaId();
    setCurrentMenuAreaId(menuAreaId);
    console.log(`現在のMenuArea ID: ${menuAreaId}`);
  }, []);

  useEffect(() => {
    let anomalyId: number;

    if (currentOrderCounter === 0 || currentOrderCounter === 8) {
      anomalyId = 0; // 0番と8番は必ず正常
    } else {
      // 現在: ID 0 (正常), ID 1 (ちらつき) の2種類
      // 将来的に異変が増えた場合、ここで利用可能なIDの数を動的に取得
      const availableIds = [0, 1]; // MenuArea, FlashingMenuArea
      anomalyId = availableIds[Math.floor(Math.random() * availableIds.length)];
    }

    setCurrentMenuAreaId(anomalyId);
    orderStorage.setCurrentMenuAreaId(anomalyId);
    console.log(
      `${currentOrderCounter}番注文口: MenuArea ID ${anomalyId} ${getMenuAreaTypeName(anomalyId)}`
    );

    // 注文口移動時に画面を最上部にスクロール
    window.scrollTo(0, 0);
  }, [currentOrderCounter]);

  const getMenuAreaTypeName = (id: number): string => {
    switch (id) {
      case 0:
        return '(正常)';
      case 1:
        return '(ちらつき異変)';
      default:
        return `(異変ID: ${id})`;
    }
  };

  const renderMenuArea = () => {
    const commonProps = {
      menu,
      selectedItem,
      onItemSelect: handleItemSelect,
    };

    switch (currentMenuAreaId) {
      case 0:
        return <MenuArea {...commonProps} />;
      case 1:
        return <FlashingMenuArea {...commonProps} />;
      default:
        // 未定義のIDの場合は正常なMenuAreaをフォールバック
        return <MenuArea {...commonProps} />;
    }
  };

  const isCorrectButton = (
    buttonType: 'back' | 'order',
    anomalyId: number
  ): boolean => {
    if (anomalyId === 0) {
      return buttonType === 'order'; // 正常時は「注文する」
    } else {
      return buttonType === 'back'; // 異変時は「引き返す」
    }
  };

  const handleBackClick = () => {
    if (isCorrectButton('back', currentMenuAreaId)) {
      // 異変時は「引き返す」で次の注文口に進む
      onMoveToNextCounter();
      console.log('正解: 異変時の引き返すボタンで次に移動');
    } else {
      onForceReturnToZero(); // 不正解: 0番注文口へ
      console.log('不正解: 0番注文口に戻される');
    }
  };

  const handleOrderClick = () => {
    if (currentOrderCounter === 8 && selectedItem) {
      handleOrder(); // 8番で商品選択済みは注文実行
      console.log('8番注文口で注文実行');
    } else if (isCorrectButton('order', currentMenuAreaId)) {
      // 正常時は「注文する」で次の注文口に進む
      onMoveToNextCounter();
      console.log('正解: 正常時の注文するボタンで次に移動');
    } else {
      onForceReturnToZero(); // 不正解: 0番注文口へ
      console.log('不正解: 0番注文口に戻される');
    }
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await kakigoriApi.getMenu();
        setMenu(response.menu);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleOrder = async () => {
    if (!selectedItem) return;

    try {
      const order = await kakigoriApi.createOrder(selectedItem.id);
      onOrderCreate(order);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>メニューを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <p>エラー: {error}</p>
      </div>
    );
  }

  return (
    <div
      className="underground-bg"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        minHeight: 'calc(100vh - 140px)',
        position: 'relative',
      }}
    >
      {/* 蛍光灯効果 */}
      <div
        className="fluorescent-light"
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: '3px',
          background:
            'linear-gradient(to right, transparent, var(--accent-yellow), transparent)',
          borderRadius: '2px',
        }}
      />

      {/* 0番注文口案内板（左側に配置） */}
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <ExitSign exitNumber={currentOrderCounter} size="medium" />
      </div>

      {/* メニューエリア */}
      {renderMenuArea()}

      <div
        className="exit-sign"
        style={{
          textAlign: 'center',
          padding: '20px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ExitButton
          onClick={handleBackClick}
          variant="default"
          size="medium"
          disabled={currentOrderCounter === 0}
        >
          引き返す
        </ExitButton>

        <ExitButton
          onClick={handleOrderClick}
          disabled={!selectedItem}
          variant="primary"
          size="large"
        >
          注文する
        </ExitButton>
      </div>
    </div>
  );
};

export default MenuList;
