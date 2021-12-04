// Componenst
import { Logo } from "../../IconsSVG/Logo";
import MainMenu from "../mainMenu/MainMenu";

// styled Components
import {
  SectionStyled,
  LogoContainer,
  LogoProvisional,
  TextDate,
  WebLink,
} from "../../../styles/admin/adminSection/style";

const AdminSection = ({ expand, user, open }) => {
  return (
    <SectionStyled expand={expand} open={open}>
      <LogoContainer expand={expand}>
        <Logo />
        {!expand && (
          <TextDate>
            {new Intl.DateTimeFormat("es-MX", {
              dateStyle: "medium",
            }).format(new Date())}
          </TextDate>
        )}
      </LogoContainer>
      {!expand && <MainMenu user={user} />}
      <div>
        <WebLink href="/" target="_blank" rel="noopener noreferrer">
          Ver sitio web
        </WebLink>
      </div>
    </SectionStyled>
  );
};

export default AdminSection;
