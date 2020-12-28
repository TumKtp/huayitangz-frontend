import { API } from "../backend";

export const signup = async (user) => {
  return (
    await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
  ).json();
};

export const signin = async (user) => {
  return (
    await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
  ).json();
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

export const signout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    try {
      await fetch(`${API}/signout`, {
        method: "GET",
      });
      console.log("signout success");
    } catch (e) {
      console.log("signout fail");
    }
    return;
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const isAdmin = () => {
  if (localStorage.getItem("jwt")) {
    const result = JSON.parse(localStorage.getItem("jwt"));
    if (result.user.role === 1) {
      return true;
    }
    return false;
  } else {
    return false;
  }
};
