import Axios from "axios";

const main = async (body, setSuccess) => {
  const { data } = await Axios.post(`/api/send-email`, body);

  if (data.status) {
    setSuccess(true);
  }
};

export const sendEmail = (
  { email, message, name, phone, property, title, date },
  setSuccess
) => {
  const bodyOfMessageToCompany = {
    subject: `Mensaje desde WebSite ${date.toLowerCase().slice(0, -6)}`,
    html: `<!DOCTYPE html>
    <html>
    <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* MEDIA QUERIES */
    @media screen and (max-width: 480px) {
        .mobile-hide {
            display: none !important;
        }
        .mobile-center {
            text-align: center !important;
        }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
    </style>
    </head>
    <body style="margin: 0 !important; padding: 0 !important; background-color: #ffffff;" bgcolor="#ffffff">

    <!-- TEXTO OCULTO DEL PREÁMBULO -->
    <div style="display: none; font-size: 1px; color: #173d75; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Nueva compra desde E-commerce! ${date.toLowerCase().slice(0, -6)}
    </div>

    <table border="0" bgcolor="#4798f7" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" >
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table align="center" border="0" bgcolor="#ffffff" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 35px;">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                    <tr>
                    <td align="left" valign="top" width="300">
                    <![endif]-->
                    <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;" bgcolor="#ffffff">
                            <tr width="100%">
                                <td width="40%" align="center" valign="top"  class="mobile-center">
                                    <a href="${process.env.NEXT_PUBLIC_URL}">
                                        <img
                                          style="width: 120px; margin: 0"
                                          src="https://res.cloudinary.com/duibtuerj/image/upload/v1631812830/vasquez-inmobiliaria/brand/Logo_okzkag.png"
                                          alt="Logotipo de Constructora e Inmobiliaria Vasquez"
                                        />
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 35px;">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                    <tr>
                    <td align="left" valign="top" width="300">
                    <![endif]-->
                    <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;" bgcolor="#ffffff">
                            <tr width="100%">
                                <td align="right" valign="top" class="mobile-center">
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                        <tr>
                                            <td width="60%" align="right" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 10px 5px; color: #173d75;">
                                                ${date
                                                  .toLowerCase()
                                                  .slice(0, -6)}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 30px 20px; background-color: #ffffff;" bgcolor="#ffffff">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                <h3 style="font-size: 18px; font-weight: 800; line-height: 20px; color: #173d75; margin: 0;">
                                    Nuevo Mensaje
                                </h3>
                            </td>
                        </tr>

                        </tr>

                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 20px 0;" bgcolor="#ffffff">
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                            <tr>
                            <td align="left" valign="top" width="300">
                            <![endif]-->
                            <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;" bgcolor="#ffffff">
                                    <tr width="70%">
                                        <td width="60%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; line-height: 14px; padding: 5px 0; color: #173d75;">
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div width="100%" style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                    <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
                                        <tr width="100%">
                                            <td width="40%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; color: #173d75; font-size: 14px; font-weight: 600; border: 2px solid #173d75;">
                                                Nombre
                                            </td>
                                            <td width="60%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; color: #173d75; font-size: 14px; font-weight: 400; border: 2px solid #173d75;">
                                                ${name}
                                            </td>
                                        </tr>
                                        <tr width="100%">
                                            <td width="40%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; color: #173d75; font-weight: 600; border: 2px solid #173d75;">
                                                Numero de teléfono
                                            </td>
                                            <td width="60%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; color: #173d75; font-weight: 400; border: 2px solid #173d75;">
                                                ${phone}
                                            </td>
                                        </tr>
                                        <tr width="100%">
                                            <td width="40%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; color: #173d75; font-weight: 600; border: 2px solid #173d75;">
                                                Correo electrónico
                                            </td>
                                            <td width="60%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; color: #173d75; font-weight: 400; border: 2px solid #173d75;">
                                                ${email}
                                            </td>
                                        </tr>
                                        <tr width="100%">
                                            <td width="40%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; color: #173d75; font-weight: 600; border: 2px solid #173d75;">
                                            Nombre de la propiedad
                                            </td>
                                            <td width="60%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; color: #173d75; font-weight: 400; border: 2px solid #173d75;">
                                                ${title}
                                            </td>
                                        </tr>
                                        <tr width="100%">
                                            <td width="40%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; color: #173d75; font-weight: 600; border: 2px solid #173d75;">
                                                Enlace Web
                                            </td>
                                            <td width="60%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; color: #173d75; font-weight: 400; border: 2px solid #173d75;">
                                                <a href="${property}" style="color: #173d75; text-decoration: none; cursor: pointer;">Ver página</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 20px 0;" bgcolor="#ffffff">
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                            <tr>
                            <td align="left" valign="top" width="300">
                            <![endif]-->
                            <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;" bgcolor="#ffffff">
                                    <tr width="70%">
                                        <td width="60%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; line-height: 14px; padding: 5px 0; color: #173d75;">
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div width="100%" style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                    <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
                                        <tr width="100%">
                                            <td width="100%" align="left" valign="top" class="mobile-center" style="padding: 5px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #173d75; font-size: 14px; font-weight: 400; border: 2px solid #173d75;">
                                                ${message}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 20px 0;" bgcolor="#ffffff">
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                            <tr>
                            <td align="left" valign="top" width="300">
                            <![endif]-->
                            <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;" bgcolor="#ffffff">
                                    <tr width="70%">
                                        <td width="60%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; line-height: 14px; padding: 5px 0; color: #173d75;">
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                            </td>
                        </tr>

                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 20px;" bgcolor="#4798f7">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                    <tr>
                    <td align="left" valign="top" width="300">
                    <![endif]-->
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 20px;">
                                <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                                        <tr width="100%">
                                            <td width="100%" align="center" style="padding: 20px; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 400; line-height: 12px;" >
                                                <p style="margin: 0; color: #ffffff;">Este email se envió de forma automática desde <a href="${
                                                  process.env.NEXT_PUBLIC_URL
                                                }" style="color: #ffffff; text-decoration: none; cursor: pointer;">Constructora e Inmobiliaria Vasquez</a></p>
                                            </td>
                                        </tr>
                                        <tr width="100%">
                                            <td width="100%"  align="center" style="padding: 10px; font-family: Helvetica, Arial, sans-serif; font-size: 8px; font-weight: 400; line-height: 10px;" >
                                                <p style="margin: 0; color: #ffffff;">Constructora e Inmobiliaria Vasquez — Todos los derechos reservados.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
        </tr>
    </table>
    </body>
    </html>
    `,
  };

  main(bodyOfMessageToCompany, setSuccess).catch((error) =>
    console.log("sendEmail error: ", error)
  );
};
