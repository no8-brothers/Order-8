const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const STORE_ID = process.env.REACT_APP_STORE_ID;

export const kakigoriApi = {
  async getMenu() {
    const response = await fetch(`${API_BASE_URL}/v1/stores/${STORE_ID}/menu`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu');
    }
    return response.json();
  },

  async createOrder(menuItemId) {
    const response = await fetch(
      `${API_BASE_URL}/v1/stores/${STORE_ID}/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menu_item_id: menuItemId,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    return response.json();
  },

  async getOrder(orderId) {
    const response = await fetch(
      `${API_BASE_URL}/v1/stores/${STORE_ID}/orders/${orderId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return response.json();
  },

  async getOrders() {
    const response = await fetch(
      `${API_BASE_URL}/v1/stores/${STORE_ID}/orders`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return response.json();
  },

  async markWaitingPickup(orderId) {
    const response = await fetch(
      `${API_BASE_URL}/v1/stores/${STORE_ID}/orders/${orderId}/waiting-pickup`,
      {
        method: 'POST',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to mark order as waiting pickup');
    }
    return response.json();
  },

  async completeOrder(orderId) {
    const response = await fetch(
      `${API_BASE_URL}/v1/stores/${STORE_ID}/orders/${orderId}/complete`,
      {
        method: 'POST',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to complete order');
    }
    return response.json();
  },
};
