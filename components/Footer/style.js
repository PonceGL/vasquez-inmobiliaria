import styled from "styled-components";

export const FooterStyled = styled.footer`
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: var(--white);
  background-color: var(--black);
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem 1rem;
    align-items: start;
  }
  @media (min-width: 1000px) {
    grid-template-columns: 1fr 2fr 2fr;
    /* background-color: var(--light-blue);
    color: var(--white); */
  }
`;

export const LogoConatiner = styled.a`
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    grid-row: 1 / sapn 1;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 1;
    grid-row: 1 / sapn 1;
    width: 10rem;
  }
`;

export const ContactMenu = styled.nav`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h4 {
    margin-right: auto;
    font-size: 1.6rem;
  }
  ul {
    margin: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  @media (min-width: 750px) {
    grid-column: 1 / span 1;
    grid-row: 2 / sapn 1;
  }
  margin: 0;
  @media (min-width: 1000px) {
    grid-column: 2 / span 1;
    grid-row: 1 / sapn 1;
  }
`;

export const FooterNav = styled(ContactMenu)`
  @media (min-width: 750px) {
    grid-column: 2 / span 1;
    grid-row: 2 / sapn 1;
  }
  @media (min-width: 1000px) {
    grid-column: 3 / span 1;
    grid-row: 1 / sapn 1;
  }
`;

export const NavList = styled.li`
  width: 100%;
  margin: 1rem 0;
  h4 {
    margin: 0.4rem 0;
    color: var(--light-blue);
  }
  a {
    padding: 0.5rem 0;
    color: var(--white);
    cursor: pointer;
    transition: 0.3s ease-in-out all;
    &:hover {
      color: var(--light-blue);
    }
  }
  p {
    margin: 0.4rem 0;
    text-align: left;
  }
  @media (min-width: 1000px) {
    width: 45%;
    margin: 0 1rem;
  }
`;

export const PhoneNumbersContainer = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Phone = styled.a`
  margin: 0.5rem 0;
  cursor: pointer;
`;

export const SoccialIconsContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LinkIcon = styled.a`
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
`;

export const FooterLinkContainer = styled.div`
  margin: 3rem 0 0;
  text-align: center;
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    margin: 0;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 3;
    grid-row: 3 / sapn 1;
  }
`;

export const LinkFooter = styled.a`
  color: var(--white);
  padding: 0.2rem;
  margin: 0.2rem;
  font-size: 1rem;
`;
