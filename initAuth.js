import { init } from "next-firebase-auth";

const initAuth = () => {
  init({
    authPageURL: "/auth",
    appPageURL: "/admin",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROYECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT,
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // required
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROYECT_ID,
    },
    cookies: {
      name: "vasqez-inmobiliaria-app", // required
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE, // set this to false in local (non-HTTPS) development
      signed: false,
    },
  });
};

export default initAuth;
