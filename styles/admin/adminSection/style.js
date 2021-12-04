import styled from "styled-components";

export const SectionStyled = styled.section`
  width: 100%;
  height: 100vh;
  padding: 5rem 3rem;
  background-color: var(--admin-white);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  position: absolute;
  top: 0;
  left: -100%;
  z-index: 2;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.open &&
    `
    left: 0;
  `}
  @media (min-width: 1000px) {
    height: 100%;
    padding-left: 3rem;
    grid-column: 1 / span 1;
    display: grid;
    grid-template-rows: 1fr 2fr 1fr;
    justify-items: center;
    align-items: center;
    transition: 0.3s ease-in-out all;
    position: initial;
    ${(props) =>
      props.expand &&
      `
    padding: 0;
  `}
  }
`;

// Logo -----------------------------------

export const LogoContainer = styled.div`
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.expand &&
    `
    align-items: center;
  `}
  @media (max-width: 1000px) {
    height: initial;
  }
`;

export const LogoProvisional = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--admin-main);
  border-radius: 2rem;
  position: relative;
  transition: 0.3s ease-in-out all;
  &:after {
    content: "\\0056";
    font-size: 5rem;
    line-height: 5rem;
    color: var(--admin-bg);
    text-align: center;
    position: absolute;
    left: 0.4rem;
    transition: 0.3s ease-in-out all;
  }
  &:before {
    content: "\\0047";
    font-size: 5rem;
    color: var(--admin-bg);
    line-height: 5rem;
    text-align: center;
    position: absolute;
    right: 0.2rem;
    transition: ease-in-out 0.3s all;
  }

  ${(props) =>
    props.expand &&
    `
    width: 4rem;
    height: 4rem;
    &:after{
      font-size: 3rem;
      line-height: 3rem;
    }
    &:before{
      font-size: 3rem;
      line-height: 3rem;
    }
  `}
`;

export const TextDate = styled.p`
  font-size: 2rem;
  margin: 2rem 0 0;
  transition: 0.3s ease-in-out all;
`;

export const WebLink = styled.a`
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
