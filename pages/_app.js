import { useEffect } from "react";
import Head from "next/head";
import initAuth from "../initAuth";
import { DefaultSeo } from "next-seo";
import changeColorTheme from "../utils/changeColorTheme";
import { launchMessenger } from "../utils/messenger";

// Styles
import "../styles/GlobalStyles.css";

initAuth();

const MyApp = ({ Component, pageProps }) => {
  changeColorTheme();

  useEffect(() => {
    launchMessenger();
  }, []);

  return (
    <>
      <DefaultSeo
        title="Constructora e Inmobiliaria Vasquez"
        description="Constructora e Inmobiliaria Vasquez, más de 25 años de no solo hacer y vender propiedades, sino de cumplir sueños"
        canonical=""
        name="Constructora e Inmobiliaria Vasquez"
        telephone="+522282107188"
        openGraph={{
          url: "",
          title: "Constructora e Inmobiliaria Vasquez",
          description:
            "Constructora e Inmobiliaria Vasquez, más de 25 años de no solo hacer y vender propiedades, sino de cumplir sueños",
          images: [
            {
              url: "https://res.cloudinary.com/civsa/image/upload/v1638987890/propiedades/orrozlyzen26otnl1h3g.jpg?w=1080&q=75",
              width: 200,
              height: 200,
              alt: "Logotipo de Constructora e Inmobiliaria Vasquez",
            },
          ],
          site_name: "Constructora e Inmobiliaria Vasquez",
        }}
        twitter={{
          cardType: "summary",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://res.cloudinary.com/civsa/image/upload/v1638987890/propiedades/j8yhsraogbhco6yfnywr.png?w=1080&q=75",
          },
        ]}
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=5"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
