import { useRef, useState, useEffect } from "react";
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
import AdminSection from "../../../../components/admin/adminSection/AdminSection";
import Aside from "../../../../components/admin/aside/Aside";
import Verifying from "../../../../components/admin/verifying/verifying";
import UpdateHouseForm from "../../../../components/admin/updateHouseForm";

// styled Components
import {
  Container,
  MainStyled,
  ButtonsMovileContainer,
  ButtonStyled,
  Line,
} from "../../../../styles/admin/AdminInicio";

const EditFull = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();
  const [property, setProperty] = useState({});
  const form = useRef(null);

  // Comprueba que el usuario este verificado
  useEffect(() => {
    if (AuthUser.email) {
      if (!AuthUser.emailVerified) {
        router.push("/denied");
      }
    }
  }, [AuthUser]);

  useEffect(async () => {
    if (router.query.id) {
      const { data } = await Axios.get(`/api/one-house/${router.query.id}`);

      if (data.status) {
        setProperty(data.data[0]);
      }
    }
  }, []);

  const handleSendData = async (house) => {
    delete house._id;
    const { data } = await Axios.post(`/api/update-property`, {
      id: router.query.id,
      set: house,
    });

    if (data.status) {
      router.push(`/admin/edit-property/${router.query.id}`);
    }
  };

  const handleUpdate = (house) => {
    Object.keys(house).forEach((key) => {
      if (house[key] == null || house[key] == "") {
        delete house[key];
      }
    });
    const returnedTarget = Object.assign(property, house);

    handleSendData(returnedTarget);
  };

  // Enviar el formulario de casa
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateHouse = new FormData(form.current);
    const house = {
      typeOfProperty:
        updateHouse.get("typeOfProperty") || property.typeOfProperty || "",

      title: updateHouse.get("title") || property.title || "",
      price: parseInt(updateHouse.get("price")) || property.price || "",

      typeOfTransaction:
        updateHouse.get("typeOfTransaction") ||
        property.typeOfTransaction ||
        "",
      address: updateHouse.get("address") || property.address || "",

      location: {
        lat: updateHouse.get("lat") || property.location.lat || "",
        lng: updateHouse.get("lng") || property.location.lng || "",
      },

      terrainSize:
        parseInt(updateHouse.get("terrainSize")) || property.terrainSize || 0,
      constructionSize:
        parseInt(updateHouse.get("constructionSize")) ||
        property.constructionSize ||
        0,
      rooms: parseInt(updateHouse.get("rooms")) || property.rooms || "",
      bathrooms:
        parseInt(updateHouse.get("bathrooms")) || property.bathrooms || "",
      parking: parseInt(updateHouse.get("parking")) || property.parking || "",
      frontMeasurement:
        parseInt(updateHouse.get("frontMeasurement")) ||
        property.frontMeasurement ||
        0,
      bottomMeasurement:
        parseInt(updateHouse.get("bottomMeasurement")) ||
        property.bottomMeasurement ||
        0,
      preservation:
        updateHouse.get("preservation") || property.preservation || "",
      levelsConstructed:
        parseInt(updateHouse.get("levelsConstructed")) ||
        property.levelsConstructed ||
        0,
      age: parseInt(updateHouse.get("age")) || property.age || "",

      subdivision: updateHouse.get("subdivision") || property.subdivision,

      description: updateHouse.get("description") || property.description || "",

      // services: [],
      services:
        updateHouse.get("services").split(",") || property.services.length > 0
          ? property.services
          : [],
    };

    handleUpdate(house);
  };

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
                  <>
                    <h1>{property.title}</h1>
                    <UpdateHouseForm
                      {...property}
                      form={form}
                      handleSubmit={handleSubmit}
                    />
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
})(EditFull);

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
// showOnweb,
// sold,
// subdivision,
// terrainSize,
// title,
// typeOfProperty,
// typeOfTransaction,
// _id
