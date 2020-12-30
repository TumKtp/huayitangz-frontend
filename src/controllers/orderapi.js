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
