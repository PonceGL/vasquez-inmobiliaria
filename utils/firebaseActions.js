import Axios from "axios";

export const updateUserInfo = async (
  uid,
  changePartners,
  setChangePartners
) => {
  const { data } = await Axios.post("/api/firebase", {
    id: uid,
    action: { emailVerified: true },
  });

  if (data.status) {
    setChangePartners(!changePartners);
  }
};

export const removeVerification = async (
  uid,
  changePartners,
  setChangePartners
) => {
  const { data } = await Axios.post("/api/firebase", {
    id: uid,
    action: { emailVerified: false },
  });

  if (data.status) {
    setChangePartners(!changePartners);
  }
};

export const enableUser = async (uid, changePartners, setChangePartners) => {
  const { data } = await Axios.post("/api/firebase", {
    id: uid,
    action: { disabled: false },
  });

  if (data.status) {
    setChangePartners(!changePartners);
  }
};

export const disabledUser = async (uid, changePartners, setChangePartners) => {
  const { data } = await Axios.post("/api/firebase", {
    id: uid,
    action: { disabled: true },
  });

  if (data.status) {
    setChangePartners(!changePartners);
  }
};

// Propiedades que admite la operación de actualización de usuarios

// email: "modifiedUser@example.com",
// phoneNumber: "+11234567890",
// emailVerified: true,
// password: "newPassword",
// displayName: "Jane Doe",
// photoURL: "http://www.example.com/12345678/photo.png",
// disabled: true,
