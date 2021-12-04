import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
    display: none;
  }
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
  }
  @media (min-width: 1000px) {
    grid-template-columns: 2fr 3fr;
  }
`;

export const DataWithImage = styled.section`
  width: 100%;
  padding: 1rem;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: var(--black);
  @media (min-width: 750px) {
    height: 100%;
    aspect-ratio: initial;
  }
`;

export const ContactMenu = styled.nav`
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  h2 {
    width: 100%;
    font-size: 1.6rem;
    text-align: center;
    color: var(--white);
  }
  ul {
    width: 100%;
    height: 100%;
    margin: 2rem 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  @media (min-width: 750px) {
    margin: 0;
  }
  @media (min-width: 1000px) {
    width: 80%;
    height: 80%;
  }
`;

export const NavList = styled.li`
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  h3 {
    color: var(--light-blue);
  }
  a {
    padding: 0.4rem 0;
    color: var(--white);
    cursor: pointer;
    transition: 0.3s ease-in-out all;
    &:hover {
      color: var(--light-blue);
    }
  }
  p {
    text-align: left;
    color: var(--white);
    font-weight: 400;
  }
  p:first-child {
    font-size: 1.6rem;
    font-weight: 900;
  }
`;

export const PhoneNumbersContainer = styled.div`
  width: 100%;
  margin: 0.2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Phone = styled.a`
  margin: 0.2rem 0;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  opacity: 0.5;
`;

export const FormContainer = styled(DataWithImage)`
  background: none;
  @media (min-width: 1000px) {
    padding: 2rem 16rem;
  }
`;
