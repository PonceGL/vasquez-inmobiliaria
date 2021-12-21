import React from "react";
import Link from "next/link";
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import FirebaseAuth from "../components/FirebaseAuth";

// Components
import { Logo } from "../components/IconsSVG/Logo";

// styled Components
import { Main, LogoContainer, LinkToHome } from "../styles/auth/style";

const styles = {
  content: {
    padding: `8px 32px`,
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    margin: 16,
  },
};

const Auth = () => (
  <Main>
    <LogoContainer>
      <Logo />
    </LogoContainer>
    <FirebaseAuth />
    <Link href="/">
      <LinkToHome>Volver al inicio</LinkToHome>
    </Link>
  </Main>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Auth);
