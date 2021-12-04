import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

// Data
import { admins } from "../../database/admins";

// Components
import AdminSection from "../../components/admin/adminSection/AdminSection";
import Aside from "../../components/admin/aside/Aside";
import Verifying from "../../components/admin/verifying/verifying";
import ListPartners from "../../components/admin/listPartners/listPartners";

// styled Components
import {
  Container,
  MainStyled,
  ButtonsMovileContainer,
  ButtonStyled,
  Line,
} from "../../styles/admin/AdminInicio";

const AdminPartners = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (AuthUser) {
      if (!admins.includes(AuthUser.email)) {
        router.push("/denied");
      }
    }
  }, [AuthUser, admins]);

  // Movile
  const [mainIsOpen, setMainIsOpen] = useState(false);
  const [asideIsOpen, setAsideIsOpen] = useState(false);

  if (AuthUser) {
    if (admins.includes(AuthUser.email)) {
      return (
        <>
          <NextSeo noindex={true} />

          <Container>
            <ButtonsMovileContainer>
              <ButtonStyled
                onClick={() => setMainIsOpen(!mainIsOpen)}
                isOpen={mainIsOpen}
              >
                <Line />
                <Line />
                <Line />
              </ButtonStyled>
              <ButtonStyled
                onClick={() => setAsideIsOpen(!asideIsOpen)}
                isOpen={asideIsOpen}
              >
                <Line />
                <Line />
                <Line />
              </ButtonStyled>
            </ButtonsMovileContainer>
            <AdminSection user={AuthUser} open={mainIsOpen} />
            <MainStyled>
              <h1>Colaboradores</h1>
              <ListPartners />
            </MainStyled>
            <Aside user={AuthUser} open={asideIsOpen} />
          </Container>
        </>
      );
    }
  } else {
    return <Verifying />;
  }
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(() => {
  return {
    props: {},
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AdminPartners);
