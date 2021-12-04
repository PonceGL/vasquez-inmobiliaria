import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import Axios from "axios";
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
import ListOfHouses from "../../components/admin/listOfHouses/listOfHouses";

// styled Components
import {
  Container,
  MainStyled,
  ButtonsMovileContainer,
  ButtonStyled,
  Line,
} from "../../styles/admin/AdminInicio";

const AdminProperties = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();
  const [houses, setHouses] = useState([]);
  const [changesHouses, setchangesHouses] = useState(false);

  useEffect(() => {
    if (AuthUser) {
      if (!AuthUser.emailVerified) {
        router.push("/denied");
      }
    }
  }, [AuthUser, admins]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.post(`/api/some-houses/some`, {
        match: {},
        query: {
          title: 1,
          address: 1,
          description: 1,
          mainPhotography: 1,
          price: 1,
          _id: 1,
          rooms: 1,
          bathrooms: 1,
          parking: 1,
          terrainSize: 1,
        },
        limit: 100,
      });

      if (data.status) {
        setHouses(data.data);
      }
    };
    getData();
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
                {houses.length > 0 && (
                  <ListOfHouses
                    houses={houses}
                    changesHouses={changesHouses}
                    setchangesHouses={setchangesHouses}
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

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(() => {
  return {
    props: {},
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AdminProperties);

// address,
// age,
// bathrooms,
// bottomMeasurement,
// constructionSize,
// description,
// frontMeasurement,
// levelsConstructed,
// location,
// mainPhotography,
// morePictures,
// parking,
// preservation,
// price,
// rooms,
// services,
// subdivision,
// terrainSize,
// title,
// typeOfProperty,
// typeOfTransaction,
// _id,
