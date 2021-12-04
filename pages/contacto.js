import React, { useEffect, useState } from "react";
import Axios from "axios";
import Fetch from "isomorphic-unfetch";
import Image from "next/image";
// import Link from "next/link";
import { NextSeo, LogoJsonLd } from "next-seo";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import HouseFormContact from "../components/HouseFormContact";

// Styled-Components
import {
  Main,
  DataWithImage,
  ContactMenu,
  NavList,
  PhoneNumbersContainer,
  Phone,
  ImageContainer,
  FormContainer,
} from "../styles/contacto/style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Formato a los numeros de telefono

const formatPhoneNumber = (numer) => {
  let cleaned = ("" + numer).replace(/\D/g, "");
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    let intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
};

// { infoContact }

const Contacto = () => {
  const [infoContact, setinfoContact] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.get("/api/info-contact");

      setinfoContact(data.data[0]);
    };
    getData();
  }, []);

  console.log(infoContact);
  if (infoContact) {
    const { _id, titleOficce, phoneNumbers, emailAddress, address, time } =
      infoContact;

    return (
      <>
        <NextSeo
          title="Contacto | Constructora e Inmobiliaria Vasquez"
          description="Tenemos una propiedad a tu medida, no dudes en contactarnos, la mejor atención para ti en todo el proceso de compra – venta."
          canonical=""
          name="Constructora e Inmobiliaria Vasquez"
          telephone="+522282107188"
          openGraph={{
            url: "",
            title: "Contacto | Constructora e Inmobiliaria Vasquez",
            description:
              "Tenemos una propiedad a tu medida, no dudes en contactarnos, la mejor atención para ti en todo el proceso de compra – venta.",
            images: [
              {
                url: "https://res.cloudinary.com/duibtuerj/image/upload/v1636671404/vasquez-inmobiliaria/brand/logotipo_ep0uyp.jpg",
                width: 200,
                height: 200,
                alt: "Logotipo de Constructora e Inmobiliaria Vasquez",
              },
            ],
            site_name: "Constructora e Inmobiliaria Vasquez",
          }}
          twitter={{
            cardType: "summary",
          }}
          address={{
            streetAddress:
              "Margarita Olivo Lara #15 Col. Rafael Lucio, C.P. 91110, Xalapa, Veracruz, México.",
            addressLocality: "Xalapa Veracruz",
            addressRegion: "MEX",
            postalCode: "91110",
            addressCountry: "MX",
          }}
          openingHours={[
            {
              opens: "08:00",
              closes: "20:30",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
            },
          ]}
        />
        <LogoJsonLd
          logo="https://res.cloudinary.com/duibtuerj/image/upload/v1636671404/vasquez-inmobiliaria/brand/logotipo_ep0uyp.jpg"
          url="vasquezinmobiliaria.com"
        />
        <Header title="Contacto | Constructora e Inmobiliaria Vasquez" />
        <Main>
          <h1>Contáctanos</h1>
          <DataWithImage>
            {infoContact && (
              <ContactMenu>
                <h2>Comunicate con nosotros</h2>
                <ul>
                  <NavList>
                    <h3>{titleOficce}</h3>
                  </NavList>

                  <NavList>
                    <p>Dirección</p>
                    <p>{address}</p>
                  </NavList>

                  {/* {phoneNumbers.length > 0 && (
                    <NavList>
                      <p>Teléfono</p>
                      <PhoneNumbersContainer>
                        {phoneNumbers.map((numerPhone) => (
                          <Phone href={`tel:+52${numerPhone}`} key={numerPhone}>
                            {formatPhoneNumber(numerPhone)}
                          </Phone>
                        ))}
                      </PhoneNumbersContainer>
                    </NavList>
                  )} */}

                  <NavList>
                    <p>Horaios de oficina</p>
                    <p>{time}</p>
                  </NavList>

                  <NavList>
                    <p>Correo Electrónico</p>
                    <p>{emailAddress}</p>
                  </NavList>
                </ul>
              </ContactMenu>
            )}
            <ImageContainer>
              <Image
                loader={loader}
                src="https://res.cloudinary.com/civsa/image/upload/v1638203879/brand/ee9dsft9tipcicgj7tmi.jpg"
                alt={`Fotografía principal de interiror`}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL
              />
            </ImageContainer>
          </DataWithImage>
          <FormContainer>
            <HouseFormContact title="Página de contacto" white={true} />
          </FormContainer>
        </Main>
        <Footer />
      </>
    );
  } else {
    return (
      <Main>
        <h3>Cargando...</h3>
      </Main>
    );
  }
};

export default Contacto;

// export const getStaticProps = async () => {
//   const getInfo = await Fetch(
//     `${process.env.NEXT_PUBLIC_URL}/api/info-contact`
//   );
//   const { data } = await getInfo.json();

//   return {
//     props: {
//       infoContact: data[0],
//     },
//     revalidate: 10,
//   };
// };
