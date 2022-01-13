import styled from "styled-components";

export const HeaderStyled = styled.header`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  h1 {
    display: none;
  }
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 9fr;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
  }
`;

export const LogoLink = styled.a`
  width: 6rem;
`;

export const OpenButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 999;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.isOpen &&
    `
    &:after {
        content: "\\2715";
        font-size: 3rem;
        color: var(--dark-blue);
        text-align: center;
        transform: translateY(0);
    }
  `}
  @media (min-width: 750px) {
    display: none;
  }
`;

export const Line = styled.div`
  width: 2rem;
  height: 0.2rem;
  background-color: var(--dark-blue);
  border-radius: 0.1rem;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.isOpen &&
    `
    display: none;
  `}
`;

export const HeaderNav = styled.nav`
  width: 100vw;
  padding: 4rem 1rem 8rem;
  min-height: 100vh;
  background-color: var(--white);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 9fr 1fr;

  position: absolute;
  top: 0;
  left: ${(props) => (props.isOpen ? `0` : `-100%`)};
  z-index: 998;
  transition: 0.3s ease-in-out all;
  ul {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  @media (min-width: 750px) {
    width: 100%;
    padding: 1rem 0;
    min-height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    position: initial;
    ul {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
    }
  }

  @media (min-width: 1200px) {
    ul {
      justify-content: flex-end;
    }
  }
`;

export const ListItem = styled.li`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 12rem;
    object-fit: contain;
  }

  @media (min-width: 750px) {
    width: fit-content;
    margin: 0;
  }

  @media (min-width: 1200px) {
    margin: 0 1rem;
  }
`;

export const ListItemLogo = styled(ListItem)`
  a {
    margin: 0 auto;
  }
  @media (min-width: 750px) {
    display: none;
  }
`;

export const ListItemLine = styled(ListItem)`
  p {
    margin: 0 auto;
  }
  @media (min-width: 750px) {
    display: none;
  }
`;

export const LinkItem = styled.a`
  color: var(--black);
  font-size: 2.5rem;
  font-weight: 300;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--light-blue);
  }
  @media (min-width: 750px) {
    color: var(--black);
    font-size: 1.4rem;
    font-weight: 900;
  }
`;

export const LastLine = styled.div`
  width: 50%;
  margin: 1rem auto;
  border-bottom: 0.1rem solid var(--black);
  @media (min-width: 750px) {
    display: none;
  }
`;

export const ListSubdivisionsContainer = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (min-width: 750px) {
    width: initial;
  }
`;

export const ListSubdivisions = styled.li`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: 0.3s ease-in-out all;

  @media (min-width: 750px) {
    width: fit-content;
    margin: 0;
    padding: 1rem;
    background-color: var(--white);
    position: absolute;
    top: -700%;
    opacity: 0;
    a {
      margin: 0.5rem 0;
      white-space: nowrap;
    }

    ${(props) =>
      props.show &&
      `
        top: 200%;
        opacity: 1;
        box-shadow: 0.2rem 0.4rem 0.5rem 0 var(--black);
    `}
  }

  @media (min-width: 1200px) {
    margin: 0 1rem;
  }
`;

export const SubdivisionsButton = styled.button`
  display: none;

  @media (min-width: 750px) {
    display: block;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    color: var(--black);
    font-size: 1.4rem;
    font-weight: 900;

    &:hover {
      color: var(--light-blue);
    }
  }
`;
