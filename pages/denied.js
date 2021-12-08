import { NextSeo } from "next-seo";

// Styled-Components
import { Main } from "../styles/denied/style";

const Denied = () => {
  return (
    <>
      <NextSeo
        title="Acceso negado | Vasquez Inmobiliaria"
        description="Descripción"
        canonical=""
        openGraph={{
          url: "",
          title: "Acceso negado | Vasquez Inmobiliaria",
          description:
            "No puedes entrar a esta sección hasta que un administrador verifique tu cuenta",
          images: [
            {
              url: "https://res.cloudinary.com/civsa/image/upload/v1638987890/propiedades/orrozlyzen26otnl1h3g.jpg?w=1080&q=75",
              width: 200,
              height: 200,
              alt: "Logotipo de Vasquez Inmobiliaria",
            },
          ],
          site_name: "Vasquez Inmobiliaria",
        }}
        twitter={{
          cardType: "summary",
        }}
      />
      <Main>
        <h1>
          No puedes entrar a esta sección hasta que un administrador verifique
          tu cuenta
        </h1>
      </Main>
    </>
  );
};

export default Denied;
