import React, { useState, useEffect, useRef, useCallback } from 'react';
import BaseMenuArea from './BaseMenuArea';
import FlashingAdPopup from './FlashingAdPopup';
import ShakingAdPopup from './ShakingAdPopup';
import SurveyAdPopup from './SurveyAdPopup';
import FakeDownloadAdPopup from './FakeDownloadAdPopup';
import MovingAdPopup from './MovingAdPopup';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface AdInstance {
  id: string;
  type: 'flashing' | 'shaking' | 'survey' | 'download' | 'moving';
  position: { x: number; y: number };
  zIndex: number;
}

interface ManyAdvertisementMenuAreaProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
  onForceReturnToZero?: () => void;
  currentOrderCounter: number;
}

const ManyAdvertisementMenuArea: React.FC<ManyAdvertisementMenuAreaProps> = ({
  menu,
  selectedItem,
  onItemSelect,
  onForceReturnToZero,
  currentOrderCounter,
}) => {
  const [ads, setAds] = useState<AdInstance[]>([]);
  const [nextZIndex, setNextZIndex] = useState(2000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef(0);

  const adTypes: AdInstance['type'][] = [
    'flashing',
    'shaking',
    'survey',
    'download',
    'moving',
  ];

  const generateRandomPosition = useCallback(() => {
    const maxWidth = Math.min(400, Math.max(280, window.innerWidth * 0.3));
    const maxHeight = Math.min(320, Math.max(200, window.innerHeight * 0.25));
    return {
      x: Math.random() * Math.max(100, window.innerWidth - maxWidth),
      y: Math.random() * Math.max(100, window.innerHeight - maxHeight),
    };
  }, []);

  const createNewAd = useCallback((): AdInstance => {
    const randomType = adTypes[Math.floor(Math.random() * adTypes.length)];
    return {
      id: `ad-${Date.now()}-${Math.random()}`,
      type: randomType,
      position: generateRandomPosition(),
      zIndex: nextZIndex,
    };
  }, [adTypes, generateRandomPosition, nextZIndex]);

  // 注文口が変更されたときに広告をリセット
  useEffect(() => {
    // 既存の広告をクリア
    setAds([]);
    setNextZIndex(2000);
    clickCountRef.current = 0;

    // 既存のタイマーをクリア
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // 1秒後に最初の広告を表示
    const initialTimeout = setTimeout(() => {
      const initialAd = createNewAd();
      setAds([initialAd]);
      setNextZIndex((prev) => prev + 1);
    }, 1000);

    // 定期的に広告を追加（最大10個まで）- より短いスパンで
    intervalRef.current = setInterval(() => {
      setAds((prev) => {
        if (prev.length < 10) {
          const newAd = {
            id: `ad-${Date.now()}-${Math.random()}`,
            type: adTypes[
              Math.floor(Math.random() * adTypes.length)
            ] as AdInstance['type'],
            position: generateRandomPosition(),
            zIndex: Date.now(), // 一意のzIndexを使用
          };
          return [...prev, newAd];
        }
        return prev;
      });
    }, 1500); // 1.5秒間隔に短縮

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentOrderCounter, adTypes, createNewAd, generateRandomPosition]); // currentOrderCounterが変更されたときに実行

  const handleCloseAd = (id: string) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));

    // 広告を閉じたら必ず1つ新しい広告を生成（最大10個まで）
    setTimeout(() => {
      setAds((prev) => {
        if (prev.length < 10) {
          const newAd = {
            id: `ad-${Date.now()}-${Math.random()}`,
            type: adTypes[
              Math.floor(Math.random() * adTypes.length)
            ] as AdInstance['type'],
            position: generateRandomPosition(),
            zIndex: Date.now(),
          };
          return [...prev, newAd];
        }
        return prev;
      });
    }, 300); // より早く補充
  };

  // メニューアイテムをクリックした時の処理
  const handleItemSelect = (item: MenuItem) => {
    onItemSelect(item);

    // クリック回数を増やす
    clickCountRef.current += 1;

    // メニュークリック時に広告を1個追加（最大10個まで）
    setAds((prev) => {
      if (prev.length < 10) {
        const newAd = {
          id: `ad-${Date.now()}-${Math.random()}`,
          type: adTypes[
            Math.floor(Math.random() * adTypes.length)
          ] as AdInstance['type'],
          position: generateRandomPosition(),
          zIndex: Date.now(),
        };
        return [...prev, newAd];
      }
      return prev;
    });
  };

  const renderAd = (ad: AdInstance) => {
    const commonProps = {
      key: ad.id,
      id: ad.id,
      position: ad.position,
      zIndex: ad.zIndex,
      onClose: () => handleCloseAd(ad.id),
      onForceReturnToZero: onForceReturnToZero,
    };

    switch (ad.type) {
      case 'flashing':
        return <FlashingAdPopup {...commonProps} />;
      case 'shaking':
        return <ShakingAdPopup {...commonProps} />;
      case 'survey':
        return <SurveyAdPopup {...commonProps} />;
      case 'download':
        return <FakeDownloadAdPopup {...commonProps} />;
      case 'moving':
        return <MovingAdPopup {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <BaseMenuArea
          menu={menu}
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
          containerStyle={{
            position: 'relative',
            zIndex: 1,
          }}
        ></BaseMenuArea>
      </div>

      {/* 広告ポップアップ群 */}
      {ads.map(renderAd)}

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}
      </style>
    </>
  );
};

export default ManyAdvertisementMenuArea;
