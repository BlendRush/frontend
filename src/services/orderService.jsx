// services/orderService.js
import { getLocalStoragedata } from "../helpers/Storage";

const serviceURL = process.env.REACT_APP_API_URL;

export async function placeOrderService(orderData) {
  try {
    const token = getLocalStoragedata("token");
    const response = await fetch(`${serviceURL}orders/orders/placeOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to place order");

    return data;
  } catch (error) {
    console.error("Error in placeOrderService:", error);
    throw error;
  }
}

export async function getUserOrdersService(userID) {
  try {
    const token = getLocalStoragedata("token");
    const userID = getLocalStoragedata("userID");
    const response = await fetch(`${serviceURL}orders/orders/getUserOrders/${userID}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch orders");

    return data;
  } catch (error) {
    console.error("Error in getUserOrdersService:", error);
    throw error;
  }
}
