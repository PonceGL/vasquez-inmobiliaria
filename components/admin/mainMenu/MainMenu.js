import Link from "next/link";

// Data
import { admins } from "../../../database/admins";

// Components
import { HomeIcon } from "../../IconsSVG/Home";
import { FraccionamientosIcon } from "../../IconsSVG/Fraccionamientos";
import { PropiedadesIcon } from "../../IconsSVG/Propiedades";
import { ContactIcon } from "../../IconsSVG/ContactIcon";

// Styled Components
import {
  NavStyled,
  ListStyled,
  ListItem,
  ListLink,
} from "../../../styles/admin/mainMenu/style";

const MainMenu = ({ user }) => {
  return (
    <NavStyled>
      <ListStyled>
        <ListItem>
          <HomeIcon width="2rem" />
          <Link href="/admin">
            <ListLink>Vista general</ListLink>
          </Link>
        </ListItem>
        <ListItem>
          <PropiedadesIcon width="2rem" />
          <Link href="/admin/properties">
            <ListLink>Propiedades</ListLink>
          </Link>
        </ListItem>
        <ListItem>
          <FraccionamientosIcon width="2rem" />
          <Link href="/admin/divisions">
            <ListLink>Fraccionamientos</ListLink>
          </Link>
        </ListItem>
        {admins && (
          <>
            {admins.includes(user.email) && (
              <ListItem>
                <ContactIcon width="2rem" />
                <Link href="/admin/contact-information">
                  <ListLink>Datos de contacto</ListLink>
                </Link>
              </ListItem>
            )}
          </>
        )}
      </ListStyled>
    </NavStyled>
  );
};

export default MainMenu;
