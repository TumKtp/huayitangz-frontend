import { API } from "../../backend";

//get all users
export const getAllUsers = async (user, token) => {
  return (
    await fetch(`${API}/users/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};
