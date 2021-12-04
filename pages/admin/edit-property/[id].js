import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Axios from "axios";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

// Data
import { admins } from "../../../database/admins";

// Components
import AdminSection from "../../../components/admin/adminSection/AdminSection";
import Aside from "../../../components/admin/aside/Aside";
import Verifying from "../../../components/admin/verifying/verifying";
import PropertyPreview from "../../../components/admin/propertyPreview/propertyPreview";

// styled Components
import {
  Container,
  MainStyled,
  ButtonsMovileContainer,
  ButtonStyled,
  Line,
} from "../../../styles/admin/AdminInicio";

const EditProperty = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();
  const [property, setProperty] = useState({});
  const [changesHouses, setchangesHouses] = useState(false);

  // Comprueba que el usuario este verificado
  useEffect(() => {
    if (AuthUser.email) {
      if (!AuthUser.emailVerified) {
        router.push("/denied");
      }
    }
  }, [AuthUser]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.get(`/api/one-house/${router.query.id}`);

      if (data.status) {
        setProperty(data.data[0]);
      }
    };

    if (router.query.id) {
      getData();
    }
  }, [changesHouses]);

  // Movile
  const [mainIsOpen, setMainIsOpen] = useState(false);
  const [asideIsOpen, setAsideIsOpen] = useState(false);

  return (
    <>
      <NextSeo noindex={true} />
      {AuthUser.email ? (
        <>
          {AuthUser.emailVerified && (
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
                {property.hasOwnProperty("_id") && (
                  <PropertyPreview
                    {...property}
                    changesHouses={changesHouses}
                    setchangesHouses={setchangesHouses}
                    admin={admins.includes(AuthUser.email) ? true : false}
                  />
                )}
              </MainStyled>
              <Aside user={AuthUser} open={asideIsOpen} />
            </Container>
          )}
        </>
      ) : (
        <Verifying />
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  });
  return {
    props: {},
  };
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(EditProperty);
