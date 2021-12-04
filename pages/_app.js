import Head from "next/head";
import initAuth from "../initAuth";
import { DefaultSeo } from "next-seo";
import changeColorTheme from "../utils/changeColorTheme";

// Styles
import "../styles/GlobalStyles.css";

initAuth();

const MyApp = ({ Component, pageProps }) => {
  changeColorTheme();

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
              url: "https://res.cloudinary.com/duibtuerj/image/upload/v1636671404/vasquez-inmobiliaria/brand/logotipo_ep0uyp.jpg",
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
            href: "https://res.cloudinary.com/duibtuerj/image/upload/v1636671404/vasquez-inmobiliaria/brand/logotipo_ep0uyp.jpg",
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
