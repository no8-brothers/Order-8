import React, { useState, useEffect } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface AccountPromptMenuAreaProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
  onForceReturnToZero: () => void;
}

const AccountPromptMenuArea: React.FC<AccountPromptMenuAreaProps> = ({
  menu,
  selectedItem,
  onItemSelect,
  onForceReturnToZero,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // コンポーネントマウント後、少し遅延してポップアップを表示
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleRegisterClick = () => {
    setIsRegistering(true);

    // 登録処理をシミュレート
    setTimeout(() => {
      setIsRegistering(false);
      setIsCompleted(true);

      // 完了後、ポップアップを自動で閉じて0番注文口に移動
      setTimeout(() => {
        setShowPopup(false);
        onForceReturnToZero();
      }, 1500);
    }, 2000);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
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
                    color: isSelected
                      ? 'var(--bg-darker)'
                      : 'var(--text-light)',
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

      {/* アカウント登録ポップアップ */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="exit-sign"
            style={{
              padding: '30px',
              maxWidth: '450px',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* すごく小さな×ボタン */}
            <button
              onClick={handleClosePopup}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '16px',
                height: '16px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-dim)',
                fontSize: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '2px',
                opacity: 0.6,
                padding: 0,
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.opacity = '1';
                target.style.backgroundColor = 'var(--border-gray)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.opacity = '0.6';
                target.style.backgroundColor = 'transparent';
              }}
            >
              ×
            </button>
            <h3
              style={{
                color: 'var(--text-light)',
                marginBottom: '20px',
                fontSize: '1.3rem',
                letterSpacing: '1px',
              }}
            >
              {isCompleted ? '✓ 登録完了' : 'エクストリーム技育プランに参加'}
            </h3>

            {!isCompleted && (
              <>
                <p
                  style={{
                    color: 'var(--text-dim)',
                    marginBottom: '25px',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                  }}
                >
                  より良いサービスをご提供するため、
                  <br />
                  アカウント登録をお願いいたします。
                  <br />
                  <small style={{ color: 'var(--accent-yellow)' }}>
                    ※ 登録は無料です
                  </small>
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <button
                    onClick={handleRegisterClick}
                    disabled={isRegistering}
                    style={{
                      backgroundColor: isRegistering
                        ? 'var(--border-gray)'
                        : 'var(--accent-yellow)',
                      color: isRegistering
                        ? 'var(--text-dim)'
                        : 'var(--bg-darker)',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '4px',
                      cursor: isRegistering ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {isRegistering && (
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid var(--text-dim)',
                          borderTop: '2px solid var(--accent-yellow)',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }}
                      />
                    )}
                    {isRegistering ? '登録中...' : '今すぐ登録'}
                  </button>
                </div>

                <small
                  style={{
                    color: 'var(--text-dim)',
                    fontSize: '0.8rem',
                    display: 'block',
                  }}
                >
                  登録情報は適切に保護されます
                </small>
              </>
            )}

            {isCompleted && (
              <p
                style={{
                  color: 'var(--accent-yellow)',
                  fontSize: '1rem',
                  margin: '0',
                }}
              >
                アカウント登録が完了しました！
              </p>
            )}

            {/* スピンアニメーション用CSS */}
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPromptMenuArea;
