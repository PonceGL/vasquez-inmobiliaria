import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem 0;
    justify-items: center;
    align-items: start;
  }
`;

export const CoverContainer = styled.section`
  width: 100%;
  height: 60vh;
  position: relative;
  h1 {
    width: 100%;
    font-size: 6rem;
    font-weight: 300;
    text-align: center;
    color: var(--white);
    position: absolute;
    top: calc(50% - 2.5rem);
    left: 0;
    z-index: 3;
  }

  @media (min-width: 750px) {
    grid-column: 1 / span 2;
  }
`;

export const Slogan = styled.p`
  width: 100%;
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  color: var(--white);
  position: absolute;
  bottom: 20%;
  left: 0;
  z-index: 3;
`;

export const BackgroundCover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #424242;
  opacity: 0.6;
  z-index: 2;
`;

export const DescriptionContainer = styled.section`
  width: 100%;
  padding: 1rem;
  margin: 2rem 0;
  p {
    width: 100%;
    text-align: justify;
  }
  @media (min-width: 750px) {
    margin: 0;
  }
  @media (min-width: 1000px) {
    width: 70%;
  }
`;

export const AllImagesContainer = styled.section`
  width: 100%;
  padding: 1rem;
  margin: 2rem 0;
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
  }
  @media (min-width: 1000px) {
    width: 70%;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
`;
