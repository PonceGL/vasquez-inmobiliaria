import styled from "styled-components";

export const NavStyled = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    height: initial;
  }
`;

export const ListStyled = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const ListLink = styled.a`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
  color: var(--admin-text);
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--admin-main);
  }
`;

export const ListItem = styled.li`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg path,
  svg rect {
    transition: 0.3s ease-in-out all;
  }
  &:hover {
    ${ListLink} {
      color: var(--admin-main);
    }
    svg path,
    svg rect {
      fill: var(--admin-main);
    }
  }
`;
