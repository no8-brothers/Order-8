const ORDER_COUNTER_KEY = 'orderCounter';
const MENU_AREA_ID_KEY = 'currentMenuAreaId';

export const orderStorage = {
  getCurrentOrderCounter(): number {
    const stored = localStorage.getItem(ORDER_COUNTER_KEY);
    return stored ? parseInt(stored, 10) : 0;
  },

  setCurrentOrderCounter(counter: number): void {
    if (counter < 0 || counter > 8) {
      throw new Error('注文口番号は0-8の範囲で指定してください');
    }
    localStorage.setItem(ORDER_COUNTER_KEY, counter.toString());
  },

  moveToNextOrderCounter(): number {
    const current = this.getCurrentOrderCounter();
    const next = (current + 1) % 9;
    this.setCurrentOrderCounter(next);
    return next;
  },

  moveToPreviousOrderCounter(): number {
    const current = this.getCurrentOrderCounter();
    let previous: number;

    if (current === 1) {
      previous = 1; // 1番注文口のときは1番に留まる
    } else if (current === 0) {
      previous = 8; // 0番のときは8番に戻る
    } else {
      previous = current - 1; // その他は-1
    }

    this.setCurrentOrderCounter(previous);
    return previous;
  },

  clearOrderCounter(): void {
    localStorage.removeItem(ORDER_COUNTER_KEY);
  },

  getCurrentMenuAreaId(): number {
    const stored = localStorage.getItem(MENU_AREA_ID_KEY);
    return stored ? parseInt(stored, 10) : 0;
  },

  setCurrentMenuAreaId(id: number): void {
    localStorage.setItem(MENU_AREA_ID_KEY, id.toString());
  },

  clearMenuAreaId(): void {
    localStorage.removeItem(MENU_AREA_ID_KEY);
  },
};
