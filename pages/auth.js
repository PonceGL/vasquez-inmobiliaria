import React from "react";
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import FirebaseAuth from "../components/FirebaseAuth";

// styled Components
import { Main, LogoContainer, LogoProvisional } from "../styles/auth/style";

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
      <LogoProvisional />
    </LogoContainer>
    <FirebaseAuth />
  </Main>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Auth);
