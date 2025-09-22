import React from 'react';
import BaseMenuArea from './BaseMenuArea';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface GarbledMenuAreaProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
}

// 文字コードミスマッチによる文字化けを再現する関数
const garbleTextByEncoding = (text: string): string => {
  try {
    // UTF-8として読み込んだ文字列をShift_JISとして解釈したような文字化けを再現
    const encoder = new TextEncoder();
    const decoder = new TextDecoder('shift_jis', { fatal: false });

    // UTF-8バイト列を取得
    const utf8Bytes = encoder.encode(text);

    // Shift_JISとして無理やりデコード（ブラウザではshift_jisが使えない場合が多いのでフォールバック）
    try {
      return decoder.decode(utf8Bytes);
    } catch {
      // フォールバック: 手動で文字化けパターンを生成
      return text
        .replace(/[あ-ん]/g, '縺�')
        .replace(/[ア-ン]/g, '繧�')
        .replace(/[カ-コ]/g, '繧ｫ')
        .replace(/[サ-ソ]/g, '繧ｵ')
        .replace(/[タ-ト]/g, '繧ｿ')
        .replace(/[ハ-ホ]/g, '繝�')
        .replace(/[マ-モ]/g, '繝�')
        .replace(/[ヤ-ヨ]/g, '繝､')
        .replace(/[ラ-ロ]/g, '繝�')
        .replace(/[ワ-ヲ]/g, '繝ｯ')
        .replace(/ー/g, '繝ｼ')
        .replace(/、/g, '縲�')
        .replace(/。/g, '縲�');
    }
  } catch {
    // より確実な文字化けパターン（ISO-2022-JPからUTF-8への変換エラー風）
    return text
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 0x3041 && code <= 0x3096) {
          // ひらがな
          return String.fromCharCode(0x7e00 + (code - 0x3041));
        } else if (code >= 0x30a1 && code <= 0x30f6) {
          // カタカナ
          return String.fromCharCode(0x7f00 + (code - 0x30a1));
        } else if (code >= 0x4e00 && code <= 0x9faf) {
          // 漢字
          return '��';
        }
        return char;
      })
      .join('');
  }
};

const GarbledMenuArea: React.FC<GarbledMenuAreaProps> = ({
  menu,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <BaseMenuArea
      menu={menu}
      selectedItem={selectedItem}
      onItemSelect={onItemSelect}
      renderItemContent={(item) => ({
        name: garbleTextByEncoding(item.name),
        description: garbleTextByEncoding(item.description),
      })}
    />
  );
};

export default GarbledMenuArea;
