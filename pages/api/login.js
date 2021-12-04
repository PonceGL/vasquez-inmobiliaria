import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../initAuth";

initAuth();

const handler = async (req, res) => {
  try {
    await setAuthCookies(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error inesperado." });
  }
  return res.status(200).json({ success: true });
};

export default handler;
