import React, { useEffect, useState } from "react";
// import Axios from "axios";
import Fetch from "isomorphic-unfetch";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Styled-Components
import { Main } from "../styles/inicio/style";
import { Title, Section } from "../styles/aviso-de-privacidad/style";

const Nosotros = () => {
  return (
    <>
      <NextSeo
        title="Aviso de Privacidad | Constructora e Inmobiliaria Vasquez"
        description="Constructora e Inmobiliaria Vasquez, más de 25 años de no solo hacer y vender propiedades, sino de cumplir sueños"
        canonical=""
        name="Aviso de Privacidad | Constructora e Inmobiliaria Vasquez"
        telephone="+522282107188"
        openGraph={{
          url: "",
          title: "Constructora e Inmobiliaria Vasquez",
          description:
            "Constructora e Inmobiliaria Vasquez, más de 25 años de no solo hacer y vender propiedades, sino de cumplir sueños",
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
      <Header title="Aviso de Privacidad | Constructora e Inmobiliaria Vasquez" />
      <Main>
        <Title>Aviso de Privacidad</Title>
        <Section>
          <p>
            Este <strong>AVISO DE PRIVACIDAD</strong> aplica a la información
            personal recopilada sobre el Titular
            <strong>
              {" "}
              por Constructora e Inmobiliaria Vasquez S.A de C.V.
            </strong>
            (en adelante, <strong>CIVSA</strong>).
          </p>

          <br />

          <p>
            El presente Aviso de Privacidad (aviso) se emite en cumplimiento por
            lo dispuesto por el artículo 15 de la Ley Federal de Protección de
            Datos Personales en Posesión de los Particulares (LFPDPPP), de los
            Lineamientos Generales previstos en el artículo 43, en su fracción
            III de esta Ley y del artículo 23 de su Reglamento.
          </p>

          <br />

          <p>
            Para los efectos del presente <strong>AVISO DE PRIVACIDAD</strong>,
            los términos que se utilicen en este y que no estén definidos en el
            mismo tendrán el significado que les atribuye la legislación en
            materia de protección de datos personales.
          </p>

          <br />

          <p>
            <strong>CIVSA</strong> es una empresa comprometida con el derecho a
            la protección de datos personales de cualquier Titular, también
            conocido como el “derecho a la autodeterminación informativa”, el
            cual está garantizado y protegido como un derecho humano, en el
            segundo párrafo del artículo 16 de la Constitución Política de los
            Estados Unidos Mexicanos y en la legislación en materia de
            protección de datos personales.
          </p>

          <br />

          <p>
            <strong>CIVSA</strong> se obliga específicamente y de manera
            enunciativa más no limitativa a: (i) Utilizar o aplicar sus datos
            personales exclusivamente para la realización de los fines
            establecidos en el presente <strong>AVISO DE PRIVACIDAD</strong>;
            (ii) Asegurarse de que sus datos personales sean manejados con
            estricta sujeción al secreto profesional y confidencialidad; (iii)
            Observar los principios de protección tales como licitud,
            consentimiento, información, calidad, finalidad, lealtad,
            proporcionalidad y responsabilidad, así como los deberes de
            seguridad y confidencialidad previstos en la legislación en materia
            de protección de datos personales, debiendo adoptar las medidas
            necesarias para su aplicación, e (iv) Implementar y mantener las
            medidas de seguridad administrativas, técnicas y físicas que
            permitan proteger sus datos contra daño, pérdida, alteración,
            destrucción o el uso, acceso o tratamiento no autorizado.
          </p>

          <br />

          <p>
            En los casos en que el tratamiento de sus datos personales esté
            contemplado en algunas de las causales o situaciones previstas por
            el artículo 10 de la Ley Federal de Protección de Datos Personales
            en Posesión de los Particulares, no será necesario su
            consentimiento.
          </p>

          <br />

          <p>
            <b>I. Responsable y domicilio</b>
          </p>

          <br />

          <p>
            <strong>CIVSA</strong> es el responsable del tratamiento de datos
            personales en términos de este AVISO DE PRIVACIDAD, con domicilio
            Margarita Olivo Lara 15F, Colonia Rafael Lucio, C.P. 91110, Xalapa,
            Veracruz, México.
          </p>

          <br />

          <p>
            Usted podrá contactar a nuestro departamento de
            <strong>“Protección de Datos”</strong> través de la siguiente cuenta
            de correo electrónico: <b>civsa@grupovasquez.com.mx</b> de lunes a
            viernes en un horario de <b>08:00 a 20:30 horas</b> en días hábiles.
          </p>

          <br />

          <p>
            <b>II. Datos personales objeto de tratamiento</b>
          </p>

          <br />

          <p>
            Dependiendo de las finalidades para las que Usted nos otorgue sus
            datos personales, le solicitaremos las siguientes categorías de
            datos:
          </p>

          <br />

          <p>
            <b>Si usted es Cliente:</b> Datos de identificación, datos de
            contacto, <b>Si usted es Prospecto de Cliente:</b> Datos de
            identificación, datos de contacto, datos laborales y demográficos.
          </p>

          <br />

          <p>
            <b>Si usted es Proveedor:</b> Datos de identificación, datos de
            contacto, datos laborales, datos patrimoniales y datos de terceros.
          </p>

          <br />

          <p>
            Considere que no en todos los casos se recaba toda la información
            anterior, lo cual atiende a que no toda la información puede ser
            proporcionada por el respectivo Titular o requerida para la
            prestación del servicio.
          </p>

          <br />

          <p>
            <b>III. Finalidades (usos) de los datos personales</b>
          </p>

          <br />

          <p>
            Los datos personales serán tratados para las finalidades siguientes:
          </p>

          <br />
          <br />

          <p>
            <b>A. Finalidades Primarias</b>
          </p>

          <br />

          <p>a) Clientes y prospectos de clientes</p>
          <br />
          <ul>
            <li>Proveer los servicios y productos que ha solicitado</li>

            <li>Envío de facturas y confirmación de pagos</li>

            <li>
              Enviar comunicaciones periódicas a sus clientes relacionadas con
              el servicio
            </li>

            <li>Prospección comercial (si es usted prospecto de cliente)</li>

            <li>
              Enviar determinadas comunicaciones de servicio obligatorias, como
              cartas de bienvenida, recordatorios de pago, información acerca de
              asuntos de servicio técnico, comercial y anuncios de seguridad
            </li>

            <li>
              Contactación para ofrecimientos de servicios o productos
              adicionales, así como recordatorios de pago, información acerca de
              asuntos de servicio técnico, comercial y anuncios de seguridad
            </li>

            <li>
              Contestar consultas pendientes de solución solicitadas previamente
              en nuestro sistema de consultoría
            </li>
          </ul>

          <br />

          <p>b) Proveedores</p>
          <br />

          <ul>
            <li>Confirmación de pagos</li>

            <li>Establecer la relación comercial</li>
          </ul>

          <br />
          <br />

          <p>
            <b>B. Finalidades Secundarias</b>
          </p>
          <br />

          <p>a) Clientes y Prospectos de clientes</p>
          <br />

          <ul>
            <li>
              Para evaluar la calidad de los productos y servicios, así como
              para llevar a cabo encuestas de satisfacción
            </li>

            <li>
              Visualizar contenidos y anuncios publicitarios personalizados en
              función de sus intereses y preferencias
            </li>

            <li>
              Enviar encuestas de productos o correos promocionales para
              informarle acerca de otros productos o servicios disponibles de
              <b>CIVSA</b>, sus filiales y subsidiarias
            </li>
          </ul>

          <br />
          <br />

          <p>
            <b>IV. Temporalidad del tratamiento de los datos personales</b>
          </p>
          <br />
          <p>
            Sus datos personales serán tratados únicamente por el tiempo
            necesario a fin de cumplir con las finalidades previstas en este
            <strong>AVISO DE PRIVACIDAD</strong> y/o de conformidad con lo
            dispuesto en la legislación en materia de protección de datos
            personales.
          </p>

          <br />
          <br />

          <p>
            <b>V. Transferencia de datos personales</b>
          </p>
          <br />
          <p>
            <b>CIVSA</b> le informa que sus datos personales pueden, en su caso,
            ser transferidos, dentro y fuera del país, a cualquier empresa
            filial, controladora o subsidiaria pertenecientes a <b>CIVSA</b>. En
            virtud de lo dispuesto por la fracción III del artículo 37 de la Ley
            Federal de Protección de Datos Personales en Posesión de los
            Particulares, dicha transferencia no requerirá de su consentimiento.
          </p>
          <br />

          <p>
            En cualquier caso, el destinatario de sus datos personales tratará
            los mismos conforme al presente <strong>AVISO DE PRIVACIDAD</strong>{" "}
            y de conformidad con la legislación en materia de protección de
            datos personales.
          </p>
          <br />

          <p>
            Lo señalado en el presente apartado, no implica que <b>CIVSA</b>{" "}
            realice transferencias de todos los datos personales que recabe,
            quedando impedido de realizar transferencias relacionadas con datos
            sensibles.
          </p>
          <br />

          <p>
            Si usted no acepta las finalidades secundarias y/o la transferencia
            de datos favor de enviar un correo a:
            <b>civsa@grupovasquez.com.mx</b>.
          </p>
          <br />

          <p>
            Mientras usted no nos envíe un correo manifestando su deseo de no
            aceptar finalidades secundarias y/o la transferencia de sus datos
            personales, entenderemos que usted está de acuerdo con ellas.
          </p>
          <br />

          <br />
          <br />

          <p>
            <b>VI. Derechos ARCO y medios para ejercerlos</b>
          </p>

          <br />

          <p>
            Como titular de datos personales,{" "}
            <u>
              usted podrá ejercer los Derechos ARCO (Acceso, Rectificación,
              Cancelación y Oposición) para el tratamiento de sus datos
              personales, enviando su solicitud directamente al departamento de
              <b>"Protección de Datos"</b> a través de la cuenta de correo
              electrónico: <b>CORREO ELECTRONICO</b>.
            </u>
          </p>
          <br />

          <p>
            Dicha solicitud deberá contener por lo menos: (a) nombre y domicilio
            u otro medio para comunicarle la respuesta a su solicitud; (b) los
            documentos que acrediten su identidad o, en su caso, la
            representación legal; (c) la descripción clara y precisa de los
            datos personales respecto de los que se solicita ejercer alguno de
            los Derechos ARCO, (d) cualquier otro elemento que facilite la
            localización de los datos personales y (e) firmar la solicitud al
            final del escrito.
          </p>
          <br />

          <p>
            Una vez presentada su solicitud en el formato preestablecido, el
            departamento de <b>"Protección de Datos"</b> comunicará en un plazo
            máximo de 20 días hábiles, contados desde la fecha en que se recibió
            dicha solicitud, la respuesta de la misma. En caso de requerir mayor
            información y/o documentación necesaria el departamento de
            <b>"Protección de Datos"</b> se pondrá en contacto con usted en un
            plazo de 5 días hábiles, contados desde la fecha de recepción de su
            solicitud; por lo que usted contará con 10 días hábiles posteriores
            a dicha comunicación, para atender este requerimiento. De lo
            contrario su solicitud se tendrá por no presentada.
          </p>

          <br />
          <p>
            Dentro de los siguientes 15 días hábiles posteriores a la respuesta
            anterior, en el caso de que sea procedente su derecho, será
            aplicado.
          </p>

          <br />
          <p>
            Si su solicitud es acerca del ejercicio del derecho de Acceso, se
            pondrán sus datos personales a su disposición a través de copias
            simples y/o documentos electrónicos.
          </p>

          <br />
          <p>
            El ejercicio de los Derechos ARCO será gratuito, así como la
            reproducción en copia simple o envío por correo electrónico.
          </p>

          <br />
          <br />

          <p>
            <b>
              VII. Revocación del consentimiento para el uso de datos personales
            </b>
          </p>
          <br />

          <p>
            Usted Titular, en todo momento, podrá revocar su consentimiento para
            el tratamiento de sus datos personales conforme al procedimiento
            previsto en el apartado anterior, haciendo el señalamiento expreso
            de que desea revocar su consentimiento.
          </p>

          <br />

          <p>
            Sin embargo, es importante que tenga en cuenta que no en todos los
            casos podremos atender su solicitud o concluir el uso de forma
            inmediata, ya que es posible que por alguna obligación legal
            requiramos seguir tratando sus datos personales. Asimismo, usted
            deberá considerar que para ciertos fines, la revocación de su
            consentimiento implicará la conclusión de su relación con nosotros.
          </p>

          <br />
          <p>
            Para mayor información sobre la protección de sus datos personales
            puede contactar a nuestro departamento de{" "}
            <b>“Protección de Datos”</b> en los medios de contacto señalados en
            este <b>AVISO DE PRIVACIDAD</b>.
          </p>

          <br />

          <p>
            La revocación del consentimiento para el uso de datos personales
            será gratuita.
          </p>

          <br />
          <br />

          <p>
            <b>VII. Uso o divulgación de datos personales</b>
          </p>
          <br />

          <p>
            <b>CIVSA</b> utilizará sus datos personales en estricto apego a las
            finalidades previstas en el presente <b>AVISO DE PRIVACIDAD</b> y
            durante el tiempo que sea necesario de conformidad con las
            disposiciones legales aplicables.
          </p>
          <br />

          <p>
            Asimismo, usted en todo momento puede contactarnos en los medios
            señalados, para atenderle cualquier tipo de duda, aclaración o
            sugerencia respecto a sus datos personales.
          </p>
          <br />

          <p>
            <b>CIVSA</b> pone a su disposición la siguiente dirección de correo
            electrónico <b>civsa@grupovasquez.com.mx</b> para que usted Titular
            pueda manifestar en todo momento su negativa a seguir recibiendo
            información o comunicados (limitar su uso o divulgación) por parte
            de nosotros desde la cuenta en que reciba dichos comunicados o
            promociones.
          </p>

          <br />
          <br />

          <p>
            <b>IX. Cookies y/o balizas web y medios electrónicos</b>
          </p>
          <br />

          <p>
            <b>CIVSA</b> utiliza cookies en su sitio web. Las Cookies son
            archivos de texto que quedan almacenados en el disco duro de su
            ordenador cuando visita algunos sitios web. Utilizamos las Cookies
            para saber, por ejemplo, si ha visitado anteriormente nuestro sitio
            web o si es la primera vez que lo hace, así como para ayudarnos a
            identificar aplicaciones del sitio web en las que pueda tener mayor
            interés.
          </p>

          <br />

          <p>
            Las Cookies pueden mejorar su experiencia on-line; por ejemplo,
            mostrándole sus preferencias cuando visita un sitio web en
            particular. En principio, la mayoría de los navegadores están
            configurados para aceptar Cookies, en la opción ayuda de la barra de
            herramientas de la mayoría de los navegadores le dirá cómo dejar de
            aceptar Cookies nuevas, cómo recibir notificaciones sobre Cookies
            nuevas y cómo deshabilitar las Cookies existentes.
          </p>
          <br />

          <p>
            Para lo anterior, <b>CIVSA</b> le informa al Titular que en todo
            momento puede deshabilitar el uso de estos mecanismos, de acuerdo
            con las instrucciones que cada empresa propietaria de los browsers
            (navegador o visor de Internet) tiene implementado para activar y
            desactivar los citados mecanismos.
          </p>
          <br />

          <p>
            Las páginas web de <b>CIVSA</b> pueden utilizar tecnologías de
            terceros las cuales pueden contener imágenes electrónicas conocidas
            como balizas web, algunas veces llamadas gifs de un píxel, que se
            pueden usar para ayudar en el envío de cookies y que permiten contar
            a los usuarios que han visitado las páginas y proporcionar servicios
            de marca conjunta.
          </p>
          <br />

          <p>
            Podemos incluir balizas web en mensajes de correo electrónico
            promocionales o en nuestros boletines para determinar si se han
            abierto y si se ha realizado alguna acción en consecuencia.
          </p>
          <br />

          <p>
            <b>CIVSA</b> puede usar balizas web de terceros para compilar
            estadísticas generales relacionadas con la efectividad de campañas
            promocionales u otras operaciones de nuestros sitios.
          </p>
          <br />

          <p>
            Prohibimos que las balizas web de nuestros sitios sean utilizadas
            por terceras personas para recopilar u obtener acceso a su
            información personal.
          </p>
          <br />

          <p>
            <b>CIVSA</b> no recaba datos personales u otra información similar a
            través de este tipo de mecanismos.
          </p>
          <br />

          <p>
            <b>CIVSA</b> le informa que:
          </p>
          <br />

          <ul>
            <li>
              El sitio web de <b>CIVSA</b> puede incluir enlaces a sitios web de
              terceros, que de accederse, ocasionará que se abandone el sitio
              web de <b>CIVSA</b>, por lo cual <b>CIVSA</b> no asume ninguna
              responsabilidad en relación con esos sitios web de terceros
            </li>
            <li>
              El sitio web de <b>CIVSA</b> puede incluir enlaces a sitios que
              administran redes sociales, en cuyo caso usted acepta que al
              proporcionar cualquier tipo de información o datos en dichos
              sitios, ocasionará que los mismos puedan ser leídos, vistos,
              accedidos, retransmitidos y tratados por cualquier persona, y por
              lo tanto libera de cualquier responsabilidad a <b>CIVSA</b>.
            </li>
          </ul>

          <br />
          <br />

          <p>
            <b>X. Cambios al presente Aviso de Privacidad</b>
          </p>
          <br />

          <p>
            Los cambios y actualizaciones del presente{" "}
            <b>AVISO DE PRIVACIDAD</b> se harán de su conocimiento en nuestro
            portal principal <strong>www.inmobiliariavasquez.mx</strong>
          </p>
          <br />

          <p>
            Si usted está consultando una versión impresa, favor de revisar
            siempre el Aviso de Privacidad en nuestro portal principal{" "}
            <strong>www.inmobiliariavasquez.mx</strong>
          </p>
          <br />

          <p>
            Al proporcionarnos por cualquier medio sus datos personales usted
            Titular expresamente reconoce y acepta el presente{" "}
            <b>AVISO DE PRIVACIDAD</b>, por lo que dicho consentimiento nos
            otorga la facultad para que procedamos con el tratamiento de los
            mismos de la forma en que se señala en el presente{" "}
            <b>AVISO DE PRIVACIDAD</b> y con estricto apego a la legislación en
            materia de protección de datos personales, sin perjuicio de los
            derechos conferidos por la misma.
          </p>
          <br />

          <p>
            Si usted considera que su derecho a la protección de sus datos
            personales ha sido vulnerado por alguna conducta u omisión de
            nuestra parte, puede contactarnos a través de los medios señalados.
          </p>
        </Section>
      </Main>
      <Footer />
    </>
  );
};

export default Nosotros;
