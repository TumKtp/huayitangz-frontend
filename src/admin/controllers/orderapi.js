import { API } from "../../backend";

export const getAllOrders = async (user, token) => {
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
