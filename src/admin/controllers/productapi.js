import { API } from "../../backend";

//create a product
export const createProduct = async (user, token, product) => {
  console.log(JSON.stringify(product));
  return (
    await fetch(`${API}/product/create/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
  ).json();
};

//delete a product
export const deleteProduct = async (user, token, productId) => {
  return (
    await fetch(`${API}/product/${productId}/${user._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

//get a product
export const getProduct = async (userId, token, productId) => {
  return (
    await fetch(`${API}/product/${productId}/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

//update a product

export const updateProduct = async (userId, token, productId, product) => {
  return (
    await fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
  ).json();
};
