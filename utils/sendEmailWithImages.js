import Axios from "axios";

const main = async (body) => {
  const { data } = await Axios.post(`/api/send-images`, body);

  //   if (data.status) {
  //     setSuccess(true);
  //   }
};

export const sendEmailWithImages = ({ date, email, image, message, name }) => {
  const bodyOfMessage = {
    subject: `Mensaje desde WebSite ${date.toLowerCase().slice(0, -6)}`,
    html: `<div>
    <p>${date}</p>
    <p>${name}</p>
    <p>${email}</p>
    <p>${message}</p>
    </div>`,
    image,
  };

  main(bodyOfMessage).catch((error) => console.log("sendEmail error: ", error));
};
