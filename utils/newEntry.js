// import fetch from "isomorphic-unfetch";
import Axios from "axios";

// const URL = `/api/new-houses`;

export const newEntry = async (property, setRegistered, url) => {
  const { data } = await Axios.post(url, property);

  if (data.status) {
    setRegistered(true);
  } else {
    setRegistered(false);
  }
};
