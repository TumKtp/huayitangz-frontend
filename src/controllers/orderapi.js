import { API } from "../backend";

export const createOrder = async (user, token, order) => {
  return (
    await fetch(`${API}/order/create/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    })
  ).json();
};

export const getOrdersForUser = async (user, token) => {
  return (
    await fetch(`${API}/orders/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};
