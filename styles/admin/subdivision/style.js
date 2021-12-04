import styled from "styled-components";

export const SubdivisionStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: var(--admin-white);
  border-radius: 2rem;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-rows: 100%; */
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
  transition: ease-in-out 0.3s all;
  @media (min-width: 750px) {
    height: min-content;
  }
  @media (min-width: 1000px) {
    grid-template-columns: ${(props) =>
      props.showImage ? `repeat(4, 1fr)` : `repeat(2, 1fr)`};
  }
`;

export const ImageContainer = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  width: 10rem;
  height: 5rem;
  position: relative;
  @media (min-width: 750px) {
    width: 14rem;
    height: 8rem;
    opacity: 0.8;
    border-radius: 1rem;
    overflow: hidden;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  @media (min-width: 750px) {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    align-items: ${(props) => (props.showImage ? `center` : `flex-start`)};
  }
  @media (min-width: 1000px) {
    align-items: flex-start;
    ${(props) =>
      props.showImage
        ? `
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    `
        : `
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    `};
  }
`;

export const SalesContainer = styled(InfoContainer)`
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  align-items: center;
  @media (min-width: 750px) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
  @media (min-width: 1000px) {
    ${(props) =>
      props.showImage
        ? `
        grid-column: 4 / span 1;
    grid-row: 1 / span 1;
    `
        : `
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    `};
  }
`;

export const SubdivisionName = styled.h4`
  font-size: 2rem;
  color: var(--admin-text);
  transition: ease-in-out 0.3s all;
  @media (min-width: 750px) {
    font-size: 2.2rem;
    margin: 1rem 0;
  }
`;

export const CirlceContainer = styled.div`
  width: 12rem;
  height: 12rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  svg {
    transform: rotate(-90deg);
    transition: ease-in-out 0.3s all;
  }

  circle:nth-child(3) {
    stroke-dashoffset: calc(
      1400 - (1400 * ${(props) => (props.porcent ? props.porcent : 0)}) / 100
    );
  }
`;

export const Number = styled.p`
  width: fit-content;
  font-size: 5rem;
  font-weight: 700;
  text-align: center;
  position: absolute;
  color: ${(props) => (props.sales ? `var(--admin-main)` : `var(--admin-bg)`)};
  transition: ease-in-out 0.3s all;
`;

export const Text = styled.p`
  font-size: 1.4rem;
  color: var(--admin-text);
  span {
    font-weight: 700;
    color: var(--admin-main);
    transition: ease-in-out 0.3s all;
  }
  @media (max-width: 1000px) {
    margin: 0.5rem 0;
  }
`;

export const Sold = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: var(--admin-text);
  opacity: 0.5;
`;

export const ActionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const LinkActions = styled.a`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  text-align: center;
  color: var(--admin-white);
  background-color: var(--admin-main);
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 0.5rem;
  opacity: 0.8;
  transition: ease-in-out 0.3s all;
  &:hover {
    opacity: 1;
  }
  @media (min-width: 750px) {
    width: 70%;
  }
  @media (min-width: 1000px) {
    width: 48%;
  }
`;
