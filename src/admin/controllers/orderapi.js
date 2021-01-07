import { API } from "../../backend";

export const getAllOrders = async (user, token) => {
  return (
    await fetch(`${API}/admin/orders/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

export const getOrderStatus = async (user, token) => {
  return (
    await fetch(`${API}/orders/status/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

export const updateOrderStatus = async (user, token, orderId, status) => {
  return (
    await fetch(`${API}/orders/${orderId}/status/${user._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(status),
    })
  ).json();
};

export const deleteOrder = async (user, token, orderId) => {
  return (
    await fetch(`${API}/orders/${orderId}/${user._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};
