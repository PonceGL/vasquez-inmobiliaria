import { useEffect, useState } from "react";
import Axios from "axios";

// Components
import { Logo } from "../IconsSVG/Logo";
import { Facebook } from "../IconsSVG/Facebook";
// import { Instagram } from "../IconsSVG/Instagram";
import { WhatsApp } from "../IconsSVG/WhatsApp";

// Styled-Components
import {
  FooterStyled,
  LogoConatiner,
  ContactMenu,
  NavList,
  PhoneNumbersContainer,
  Phone,
  FooterNav,
  FooterLinkContainer,
  SoccialIconsContainer,
  LinkIcon,
  LinkFooter,
} from "./style";

const formatPhoneNumber = (numer) => {
  let cleaned = ("" + numer).replace(/\D/g, "");
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    let intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
};

const Footer = () => {
  const [whatsAppNumber, setWhatsAppNumber] = useState({});
  const [infoContact, setinfoContact] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.get("/api/info-contact");

      setinfoContact(data.data);
    };
    getData();
  }, []);

  const handleGetDataWhatsApp = async () => {
    const { data } = await Axios.get("/api/whatsApp-contact/all");
    if (data.data.length > 0) {
      setWhatsAppNumber(data.data[0]);
    }
  };

  useEffect(() => {
    handleGetDataWhatsApp();
  }, []);

  return (
    <FooterStyled>
      <LogoConatiner href="/" aria-label="Logotipo de Vasques Inmobiliaria">
        <Logo />
      </LogoConatiner>

      {infoContact.length > 0 && (
        <ContactMenu>
          <h5>Puede comunicarse</h5>
          <ul>
            {infoContact.map(
              ({
                address,
                emailAddress,
                phoneNumbers,
                time,
                titleOficce,
                _id,
              }) => (
                <NavList key={_id}>
                  <h4>{titleOficce}</h4>
                  <PhoneNumbersContainer>
                    {phoneNumbers.slice(0, 4).map((numerPhone) => (
                      <Phone href={`tel:+52${numerPhone}`} key={numerPhone}>
                        {formatPhoneNumber(numerPhone)}
                      </Phone>
                    ))}
                  </PhoneNumbersContainer>
                  {time && <p>{time}</p>}
                  {emailAddress && <p>{emailAddress}</p>}
                  {address && <p>{address}</p>}
                </NavList>
              )
            )}
          </ul>
        </ContactMenu>
      )}

      <FooterNav>
        <ul>
          <NavList>
            <a href="/casas">Encuentra tu propiedad</a>
          </NavList>
          <NavList>
            <a href="/nosotros">Nosotros</a>
          </NavList>
          <NavList>
            <a href="/contacto">Contáctanos</a>
          </NavList>
        </ul>
      </FooterNav>

      <FooterLinkContainer>
        <SoccialIconsContainer>
          <LinkIcon
            href="https://www.facebook.com/Constructora-e-Inmobiliaria-Vasquez-117127883446986/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enlace a Facebook"
          >
            <Facebook />
          </LinkIcon>
          {/* <LinkIcon href="#">
            <Instagram />
          </LinkIcon> */}
          {whatsAppNumber.hasOwnProperty("numerPhone") && (
            <LinkIcon
              href={`https://api.whatsapp.com/send?phone=+52${whatsAppNumber.numerPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enlace a WhatsApp"
            >
              <WhatsApp />
            </LinkIcon>
          )}
          {/* <LinkIcon href="#">
            <Twitter />
          </LinkIcon> */}
        </SoccialIconsContainer>
        <LinkFooter href="#">Ayuda y asistencia</LinkFooter>-
        <LinkFooter href="#">Términos y condiciones</LinkFooter>
        <br />
        <LinkFooter href="#">Política de privacióad</LinkFooter>
      </FooterLinkContainer>
    </FooterStyled>
  );
};

export default Footer;
