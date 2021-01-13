//get all users
export const getAllUsers = async (user, token) => {
  return (
    await fetch(`/api/users/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};
