import { API } from "./backend";

export const getProducts = async (user, token) => {
  return (
    await fetch(`${API}/products/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};
