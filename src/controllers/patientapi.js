export const createPatient = async (user, token, patient) => {
  return (
    await fetch(`/api/patient/create/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patient),
    })
  ).json();
};

export const getAllPatients = async (user, token) => {
  return (
    await fetch(`/api/patients/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};
