import { API } from "../../backend";

// get all categories
export const getCategories = async () => {
  return (
    await fetch(`${API}/categories`, {
      method: "GET",
    })
  ).json();
};

export const getCategory = async (categoryId) => {
  return (
    await fetch(`${API}/category/${categoryId}`, {
      method: "GET",
    })
  ).json();
};

// create category
export const createCategory = async (userId, token, category) => {
  return (
    await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
  ).json();
};

// delete category
export const deleteCategory = async (userId, token, categoryId) => {
  return (
    await fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

//uodate category
export const updateCategory = async (userId, token, categoryId, name) => {
  return (
    await fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(name),
    })
  ).json();
};
