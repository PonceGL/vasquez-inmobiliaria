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
import Subdivisions from "../../components/admin/subdivisions/subdivisions";
import ListOfHouses from "../../components/admin/listOfHouses/listOfHouses";
import Verifying from "../../components/admin/verifying/verifying";

// styled Components
import {
  Container,
  MainStyled,
  ButtonsMovileContainer,
  ButtonStyled,
  Line,
} from "../../styles/admin/AdminInicio";

const AdminInicio = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();
  const [houses, setHouses] = useState([]);
  const [divicions, setDivicions] = useState([]);
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
        limit: 4,
      });

      if (data.status) {
        setHouses(data.data);
      }
    };
    getData();
  }, [changesHouses]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.post(`/api/subdivisions/some`, {
        match: {},
        query: {
          name: 1,
          logo: 1,
          pricem2: 1,
          showOnweb: 1,
        },
        limit: 2,
      });

      if (data.status) {
        setDivicions(data.data);
      }
    };
    getData();
  }, []);

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
                <Subdivisions
                  subdivisions={divicions}
                  changesHouses={changesHouses}
                />
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

export const getServerSideProps = async () => {
  withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  });
  return {
    props: {},
  };
};

// export const getServerSideProps = withAuthUserTokenSSR({
//   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
// })(() => {
//   return {
//     props: {},
//   };
// });

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AdminInicio);

// db.casas.find({}, {_id: 1, registrationDate: 1})
// db.casas.updateOne({_id: ObjectId("61687ef56f3e4d33540dfb3a")}, {$set: {registrationDate: new Date()}})

// db.casas.aggregate({ $match: { showOnweb: true } }, {$sort: {registrationDate: -1}}, { $limit: 4 })
