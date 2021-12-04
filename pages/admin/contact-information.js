import React, { useEffect, useState, useRef } from "react";
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
import { admins } from "../../database/admins";

// Components
import AdminSection from "../../components/admin/adminSection/AdminSection";
import Aside from "../../components/admin/aside/Aside";
import FormContactInformation from "../../components/admin/form-contact-information/formContactInformation";
import FormWhatsapp from "../../components/admin/form-whatsapp/formWhatsapp";
import ListRecords from "../../components/admin/listRecords/listRecords";
import ListRecordsWhatsApp from "../../components/admin/listRecordsWhatsApp/listRecordsWhatsApp";
import Verifying from "../../components/admin/verifying/verifying";

// styled Components
import {
  Container,
  ButtonsMovileContainer,
  ButtonStyled,
  Line,
} from "../../styles/admin/AdminInicio";
import {
  MainStyled,
  DataInformation,
  RecordsConatiner,
  RecordsConatinerWhatsApp,
  FormContainer,
} from "../../styles/admin/contact-information";

const AdminPartners = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [whatsAppNumber, setWhatsAppNumber] = useState([]);
  const form = useRef(null);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    if (AuthUser) {
      if (!admins.includes(AuthUser.email)) {
        router.push("/denied");
      }
    }
  }, [AuthUser, admins]);

  const handleGetData = async () => {
    const { data } = await Axios.get("/api/info-contact");
    setRecords(data.data);
  };

  const handleGetDataWhatsApp = async () => {
    const { data } = await Axios.get("/api/whatsApp-contact/all");
    setWhatsAppNumber(data.data);
  };

  const handleSendData = async (office) => {
    const { data } = await Axios.post("/api/info-contact", office);

    if (data.status) {
      handleGetData();
    } else if (!data.status) {
      setMessageError(error);
      setTimeout(() => {
        setMessageError("");
      }, 3000);
    }
  };

  useEffect(() => {
    handleGetData();
    handleGetDataWhatsApp();
  }, []);

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
              <h1>Datos de contacto</h1>
              <DataInformation>
                {records.length > 0 ? (
                  <RecordsConatiner>
                    {records.map((record) => (
                      <ListRecords
                        key={record._id}
                        {...record}
                        handleGetData={handleGetData}
                      />
                    ))}
                  </RecordsConatiner>
                ) : (
                  <RecordsConatiner>
                    <p>
                      No hay datos de contacto registrados, es necesario tener
                      al menos uno
                    </p>
                  </RecordsConatiner>
                )}
                {whatsAppNumber.length > 0 && (
                  <RecordsConatinerWhatsApp>
                    <h4>Números de WhatsApp</h4>
                    {whatsAppNumber.map((number) => (
                      <ListRecordsWhatsApp
                        key={number._id}
                        {...number}
                        handleGetData={handleGetDataWhatsApp}
                      />
                    ))}
                  </RecordsConatinerWhatsApp>
                )}
              </DataInformation>
              <FormContainer>
                <FormContactInformation
                  handleSendData={handleSendData}
                  form={form}
                  error={messageError}
                />
                <FormWhatsapp handleGetData={handleGetDataWhatsApp} />
              </FormContainer>
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
