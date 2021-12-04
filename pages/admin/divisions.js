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

// Components
import AdminSection from "../../components/admin/adminSection/AdminSection";
import Aside from "../../components/admin/aside/Aside";
import Subdivision from "../../components/admin/subdivision/subdivision";
import Verifying from "../../components/admin/verifying/verifying";

// styled Components
import {
  Container,
  MainStyled,
  ButtonsMovileContainer,
  ButtonStyled,
  Line,
} from "../../styles/admin/AdminInicio";

const AdminDivisions = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();
  const [divicions, setDivicions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.post(`/api/subdivisions/some`, {
        match: {},
        query: {
          name: 1,
          mainPhotography: 1,
          pricem2: 1,
          showOnweb: 1,
        },
        limit: 100,
      });

      if (data.status) {
        setDivicions(data.data);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (AuthUser.email) {
      if (!AuthUser.emailVerified) {
        router.push("/denied");
      }
    }
  }, [AuthUser]);

  console.log("====================================");
  console.log(divicions);
  console.log("====================================");

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
                {divicions.length > 0 && (
                  <>
                    {divicions.map((subdivision) => (
                      <Subdivision
                        key={subdivision._id}
                        {...subdivision}
                        showImage={true}
                      />
                    ))}
                  </>
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

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(() => {
  return {
    props: {},
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AdminDivisions);
