import React, { useState, useEffect, useRef } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

interface TermsOfServiceProps {
  menu: MenuItem[];
  selectedItem: MenuItem | null;
  onItemSelect: (item: MenuItem) => void;
  onForceReturnToZero: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({
  menu,
  selectedItem,
  onItemSelect,
  onForceReturnToZero,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [canAgree, setCanAgree] = useState(false); // ← 追加

  useEffect(() => {
    // コンポーネントマウント後、少し遅延してポップアップを表示
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // スクロール判定
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

    if (reachedBottom) {
      setCanAgree(true);
    }
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);

    setTimeout(() => {
      setIsRegistering(false);
      setIsCompleted(true);

      // 完了後、ポップアップを自動で閉じる
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);
    }, 2000);
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

      {/* 利用規約ポップアップ */}
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
            <h3
              style={{
                color: 'var(--text-light)',
                marginBottom: '20px',
                fontSize: '1.3rem',
                letterSpacing: '1px',
              }}
            >
              {isCompleted ? '✓ 同意' : '利用規約'}
            </h3>

            {!isCompleted && (
              <>
                <p
                  ref={scrollRef}
                  onScroll={handleScroll}
                  style={{
                    color: 'var(--text-dim)',
                    marginBottom: '25px',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    textAlign: 'left',
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <>
                      本利用規約（以下「本規約」という。）は、Order-８（以下「本サービス」という。）の利用条件を定めるものです。
                      <br />
                      <br /> <br />
                      ユーザーの皆様（以下「ユーザー」という。）には、本規約に従って本サービスをご利用いただきます。
                      <br />
                      <br /> <br />
                      第１章　総則
                      <br />
                      <br /> <br />
                      本サービスは「かき氷を注文できるかもしれない」仕組みを提供するにすぎず、実際にかき氷が提供される保証は一切なく、また当チームは一切の責任を負いかねます。
                      <br />
                      <br /> <br />
                      本規約に同意しない限り先の注文口へは進めません。
                      <br />
                      <br /> <br />
                      ユーザーは毎回異なるUIの異変を看破する必要があります。
                      <br />
                      <br /> <br />
                      本サービスは「使いづらさ」を最大の価値として提供しており、これを不便と感じること自体が利用規約違反に該当します。
                      <br />
                      <br /> <br />
                      第２章　注文に関する条項
                      <br />
                      <br /> <br />
                      　第１条（味の選択）
                      <br />
                      <br /> <br />
                      　選択可能な味は以下の通りとします：
                      <br />
                      <br /> <br />
                      　・技育祭ないちご味
                      <br />
                      <br /> <br />
                      　・技育博なメロン味
                      <br />
                      <br /> <br />
                      　・技育展なブルーハワイ味
                      <br />
                      <br /> <br />
                      　・技育CAMPなオレンジ味
                      <br />
                      <br /> <br />
                      　注文後に味が入れ替わることがあり、届いた際に「注文と異なる味」であることがあります。
                      <br />
                      <br /> <br />
                      　第２条（サイズ）
                      <br />
                      <br /> <br />
                      　提供サイズは１つのみです。
                      <br />
                      <br /> <br />
                      第３条（注意事項）
                      <br />
                      <br /> <br />
                      　注文後のキャンセルは一切できません。
                      <br />
                      <br /> <br />
                      　注文中にリロードすると進んだ注文口がリセットされます。
                      <br />
                      <br /> <br />
                      　不正な操作・バグの悪用・理不尽なクレームを入れる場合、注文を受け付けない場合があります。
                      <br />
                      <br /> <br />
                      　すべての異変を見つけても達成感以外手に入りません。
                      <br />
                      <br /> <br />
                      第3章　禁止事項
                      <br />
                      <br /> <br />
                      以下の行為を禁止します。違反した場合、注文を受け付けない場合があります。
                      <br />
                      <br /> <br />
                      食べたくない味を注文すること。
                      <br />
                      <br /> <br />
                      注文完了後にブラウザの戻るボタンを押すこと。
                      <br />
                      <br /> <br />
                      「UIが不便だ」と口に出すこと。
                      <br />
                      <br /> <br />
                      「注文できない」と主張すること。
                      <br />
                      <br /> <br />
                      UIを不便と思わないこと。
                      <br />
                      <br /> <br />
                      注文途中で冷房をONにすること。
                      <br />
                      <br /> <br />
                      かき氷のシロップを「ただの砂糖水」と呼ぶこと。
                      <br />
                      （シロップはすべて同じ味と言うのも同義とみなす。）
                      <br />
                      <br /> <br />
                      注文をキャンセルしようとすること。
                      <br />
                      <br /> <br />
                      利用規約の長さに対して文句を言うこと。
                      <br />
                      <br /> <br />
                      かき氷の悪口を言うこと。
                      <br />
                      <br /> <br />
                      かき氷に対しておいしいといわないこと。
                      <br />
                      <br /> <br />
                      かき氷を食べる前に写真を撮り、SNSに投稿すること。
                      <br />
                      <br /> <br />
                      いっしょに食べる人と会話を弾ませること。
                      <br />
                      <br /> <br />
                      注文を5分以内に済ませること。
                      <br />
                      <br /> <br />
                      かき氷を食べるときに箸を使うこと。
                      <br />
                      <br /> <br />
                      かき氷を食べるときに笑顔になること。
                      <br />
                      <br /> <br />
                      かき氷を食べずに捨てること。
                      <br />
                      <br /> <br />
                      かき氷を溶かしてから飲むこと。
                      <br />
                      <br /> <br />
                      第4章　責任制限
                      <br />
                      <br /> <br />
                      届いたかき氷が液体化した場合でも、返品・返金には応じません。
                      <br />
                      <br /> <br />
                      注文中に発生するUI異常は演出であり、障害ではありません。
                      <br />
                      <br /> <br />
                      本サービスを利用した結果、舌が虹色になる・冷感が永続するなどの副作用が発生しても、当チームは一切責任を負いません。
                      <br />
                      <br /> <br />
                      第5章　ユーザーへの試練
                      <br />
                      <br /> <br />
                      第6章　規約の改訂
                      <br />
                      <br /> <br />
                      本規約は、当チームの気分に応じて随時改訂されます。
                      <br />
                      <br /> <br />
                      改訂は予告なく行われ、画面を1ピクセルでもスクロールした時点で新しい規約が適用されます。
                      <br />
                      <br /> <br />
                      旧規約を暗記していても意味はなく、その記憶はただの徒労に終わります。
                      <br />
                      <br /> <br />
                      第7章　附則
                      <br />
                      <br /> <br />
                      本規約の有効期限は無期限です。
                      <br />
                      <br /> <br />
                      利用者が「もう読めない」と感じた時点で、本規約は真の目的を達したものとみなされます。
                      <br />
                      <br /> <br />
                      本規約全文を最後まで読み切ったユーザーには、特典として「幻のかき氷・虚無味」の注文権が付与されません。
                      <br />
                      <br /> <br />
                    </>
                  ))}
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
                    disabled={!canAgree || isRegistering}
                    style={{
                      backgroundColor: isRegistering
                        ? 'var(--border-gray)'
                        : canAgree
                          ? 'var(--accent-yellow)' // ← スクロール完了したら黄色
                          : 'var(--border-gray)', // ← まだスクロールしてなければ灰色
                      color:
                        isRegistering || !canAgree
                          ? 'var(--text-dim)'
                          : 'var(--bg-darker)',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '4px',
                      cursor:
                        !canAgree || isRegistering ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {isRegistering ? '確認中...' : '同意して買い物を続ける'}
                  </button>
                </div>
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
                利用規約に同意しました
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TermsOfService;
