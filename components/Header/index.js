import { useEffect, useState } from "react";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import { Logo } from "../IconsSVG/Logo";
import MenuItemSubdivisions from "../MenuItemSubdivisions";

// Styled-Components
import {
  HeaderStyled,
  LogoLink,
  OpenButton,
  Line,
  HeaderNav,
  NavList,
  ListItemLogo,
  ListItem,
  LinkItem,
  LastLine,
  ListItemLine,
} from "./style";

const Header = ({ title }) => {
  const router = useRouter();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [subdivisions, setSubdivisions] = useState([]);

  const handleMenuOpen = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.post(`/api/subdivisions/some`, {
        match: {},
        query: {
          name: 1,
        },
        limit: 2,
      });

      if (data.status) {
        setSubdivisions(data.data);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setMenuIsOpen(false);
  }, [router]);

  return (
    <HeaderStyled>
      <h1>{title}</h1>
      <Link href="/">
        <LogoLink aria-label="Logotipo de Vasques Inmobiliaria">
          <Logo />
        </LogoLink>
      </Link>
      <OpenButton type="button" isOpen={menuIsOpen} onClick={handleMenuOpen}>
        <Line isOpen={menuIsOpen} />
        <Line isOpen={menuIsOpen} />
        <Line isOpen={menuIsOpen} />
      </OpenButton>
      <HeaderNav isOpen={menuIsOpen}>
        <NavList>
          <ListItemLogo>
            <Link href="/">
              <a aria-label="Logotipo de Vasques Inmobiliaria">
                <img
                  src="https://res.cloudinary.com/duibtuerj/image/upload/v1631812830/vasquez-inmobiliaria/brand/Logo_okzkag.png"
                  alt="Logotipo de Vasques Inmobiliaria"
                />
              </a>
            </Link>
          </ListItemLogo>
          <ListItem>
            <Link href="/casas">
              <LinkItem>Propiedades</LinkItem>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/detalles/preventa">
              <LinkItem>Preventa</LinkItem>
            </Link>
          </ListItem>
          <MenuItemSubdivisions subdivisions={subdivisions} />

          <ListItem>
            <Link href="/nosotros">
              <LinkItem>Nosotros</LinkItem>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/contacto">
              <LinkItem>Cont??ctanos</LinkItem>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/vende-tu-propiedad">
              <LinkItem>Vende tu propiedad</LinkItem>
            </Link>
          </ListItem>
          <ListItemLine>
            <LastLine />
          </ListItemLine>
          <ListItemLine>
            <p>Nos especificamos en crear fraccionamientos para ti</p>
          </ListItemLine>
        </NavList>
      </HeaderNav>
    </HeaderStyled>
  );
};

export default Header;
