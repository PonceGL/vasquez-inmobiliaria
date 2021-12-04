import React from "react";
import changeColorTheme from "../../../utils/changeColorTheme";
import firebase from "firebase";
import Link from "next/link";

// Components
import Actions from "../actions/actions";
import { Themelight } from "../../IconsSVG/Themelight";
import { Themedark } from "../../IconsSVG/Themedark";

// styled Components
import {
  AsideStyled,
  TopButtonsContainer,
  ChangeWidth,
  ButtonChangeTheme,
  UserContainer,
  ProfileLink,
  ButtonExit,
} from "../../../styles/admin/aside/style";

const Aside = ({ user, expand, setExpand, open }) => {
  const { colorTheme, darkTheme, lightTheme } = changeColorTheme();

  const handleClick = () => {
    if (document.documentElement.getAttribute("data-theme") === "light") {
      darkTheme();
    } else if (document.documentElement.getAttribute("data-theme") === "dark") {
      lightTheme();
    }
  };

  return (
    <AsideStyled expand={expand} open={open}>
      <TopButtonsContainer expand={expand}>
        {setExpand && (
          <ChangeWidth type="button" onClick={() => setExpand(!expand)}>
            Abrir
          </ChangeWidth>
        )}
        <ButtonChangeTheme type="button" onClick={handleClick}>
          {colorTheme === "dark" ? <Themelight /> : <Themedark />}
        </ButtonChangeTheme>
      </TopButtonsContainer>
      {!expand && <Actions user={user} />}
      {user && (
        <UserContainer>
          {user.displayName && (
            <Link href="#">
              <ProfileLink>
                {user.displayName}
                <span>Mi perfil</span>
              </ProfileLink>
            </Link>
          )}
          <ButtonExit type="button" onClick={() => firebase.auth().signOut()}>
            Salir
          </ButtonExit>
        </UserContainer>
      )}
    </AsideStyled>
  );
};

export default Aside;
