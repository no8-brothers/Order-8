import React from 'react';

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
    <div
      className="exit-sign"
      style={{
        marginBottom: '30px',
        padding: '25px',
      }}
    >
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
                  {garbleTextByEncoding(item.name)}
                </h3>
                <p
                  style={{
                    margin: '0',
                    color: 'var(--text-dim)',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                  }}
                >
                  {garbleTextByEncoding(item.description)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GarbledMenuArea;
