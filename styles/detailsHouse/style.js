import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 750px) {
    align-items: center;
  }
  @media (min-width: 1000px) {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem 0;
    justify-items: center;
    align-items: start;
  }
`;

export const Sold = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff8659;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  p {
    color: var(--white);
    text-decoration: line-through;
  }
`;

export const IconsContainer = styled.section`
  width: 100%;
  margin: 1.5rem 0;
  padding: 0.5rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const IconInfo = styled.div`
  width: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  align-items: center;
  p {
    color: var(--black);
  }
  @media (min-width: 1000px) {
    width: 6rem;
  }
`;

export const InfoContainer = styled.section`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  @media (min-width: 750px) {
    width: 90%;
    margin: 0 auto;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
    width: 70%;
    margin: 0 auto 0 5%;
  }
`;

export const IconShareContainer = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  padding: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;

  position: absolute;
  z-index: 4;
  @media (min-width: 1000px) {
    display: none;
  }
`;

export const LocationLink = styled.a`
  width: 70%;
  margin: 1.5rem auto;
  padding: 1rem;
  color: var(--white);
  text-align: center;
  background-color: var(--dark-blue);
  border-radius: 2rem;
  cursor: pointer;
  @media (min-width: 750px) {
    width: 30%;
    margin-left: auto;
    margin-right: 0;
  }
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.show ? `auto` : `8rem`)};
  margin: 1rem 0;
  position: relative;
  overflow: hidden;
  transition: 0.3s ease-in-out all;
`;

export const Gradient = styled.div`
  width: 100%;
  height: ${(props) => (props.show ? `auto` : `90%`)};
  margin: ${(props) => (props.show ? `1rem 0 0 0` : `0`)};

  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  background: ${(props) =>
    props.show
      ? `none`
      : `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 70%);`};
  position: ${(props) => (props.show ? `initial` : `absolute`)};
  bottom: 0;
  left: 0;
  transition: 0.3s ease-in-out all;
`;

export const ShowMoreButton = styled.button`
  text-align: left;
  padding: 0.2rem;
  color: var(--light-blue);
  background-color: var(--white);
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.show
      ? `
    &:before {
    position: absolute;
    content: "";
    top: 0;
    right: -2rem;
    width: 0;
    height: 0;
    border: 0.6rem solid transparent;
    border-color: var(--light-blue) transparent transparent transparent;
    transform: rotate(180deg);
  }
    
    `
      : `
    &:before {
    position: absolute;
    content: "";
    top: 0.5rem;
    right: -2rem;
    width: 0;
    height: 0;
    border: 0.6rem solid transparent;
    border-color: var(--light-blue) transparent transparent transparent;
  }
    `};
`;

export const Description = styled.p`
  width: 100%;
`;

export const Price = styled.p`
  width: 100%;
  span {
    font-size: 2.2rem;
    font-weight: 700;
  }
  ${(props) =>
    props.sold &&
    `
    color: var(--gray);
    text-decoration: line-through;
    opacity: 0.7;
  `}
`;

export const FeaturesContainer = styled(InfoContainer)`
  @media (min-width: 750px) {
    h3 {
      width: 100%;
      padding: 0.4rem 0;
      border-bottom: 0.1rem solid var(--black);
    }
  }
`;

export const Features = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  justify-items: start;
  align-items: center;
`;

export const Services = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  justify-items: start;
  align-items: center;
  @media (min-width: 750px) {
    width: 90%;
    margin: 0 auto 1rem;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
    width: 70%;
    margin: 0 auto 0 5%;
  }
`;

export const WhatsAppButton = styled.a`
  width: 100%;
  padding: 1rem;

  color: var(--white);
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background: #25d366;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;

  svg {
    width: 2.5rem;
    margin-right: 1rem;
  }

  @media (min-width: 1000px) {
    width: 6.2rem;
    height: 6.2rem;
    padding: 0;
    border-radius: 50%;
    position: fixed;
    bottom: 2.5rem;
    right: 9rem;
    span {
      display: none;
    }
    svg {
      width: 4rem;
      margin-right: 0;
    }
  }
`;

export const RelatedContainer = styled.section`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }
`;
