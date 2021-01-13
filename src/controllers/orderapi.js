export const createOrder = async (user, token, order) => {
  return (
    await fetch(`/api/order/create/${user._id}`, {
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
    await fetch(`/api/orders/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};
