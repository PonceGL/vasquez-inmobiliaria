import styled from "styled-components";

export const MainImage = styled.section`
  width: 100%;
  min-height: 30vh;
  position: relative;
  cursor: pointer;
  @media (min-width: 750px) {
    min-height: 40vh;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
    min-height: 63vh;
    overflow: hidden;
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
    color: var(--black);
  }
  @media (min-width: 750px) {
    width: 90%;
    margin: 0 auto;
  }
  @media (min-width: 1000px) {
    padding: 4rem;
    grid-column: 1 / span 2;
    background-color: var(--white);
    border-radius: 1rem 1rem 0 0;
    transform: translateY(-8rem);
  }
`;

export const FeaturesContainer = styled.section`
  width: 100%;
  padding: 1rem 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const RenderSection = styled.section`
  width: 100%;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3rem;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
    width: 90%;
    margin-top: 0;
  }
`;

export const RenderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  ${(props) =>
    props.reverse && "margin-top: 4rem; flex-direction: row-reverse;"}
  ${(props) =>
    props.second ? "align-items: flex-end;" : "align-items: flex-start;"}
  @media (min-width: 750px) {
    width: 100%;
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: flex-start;
    ${(props) => props.reverse && "margin-top: 0; flex-direction: row;"}
  }
`;

export const Render = styled.button`
  width: 45%;
  background: none;
  border: none;
  outline: none;
  @media (min-width: 750px) {
    width: 40%;
  }
`;

export const DatailsRender = styled.div`
  width: 45%;
  @media (min-width: 750px) {
    padding: 0 2rem;
  }
`;

export const DatailsRenderTitle = styled.p`
  font-size: 2rem;
  font-weight: 800;
`;

export const DatailsRenderList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  li {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const GalleryContainer = styled.section`
  width: 100%;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  p {
    padding-left: 1rem;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
    width: 90%;
  }
`;

export const ImagesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 12rem);
  grid-gap: 0.5rem;
  @media (min-width: 750px) {
    width: fit-content;
    margin: 1rem auto;
    grid-template-columns: repeat(4, 18rem);
    grid-template-rows: repeat(4, 18rem);
    grid-gap: 1rem;
  }
  @media (min-width: 1000px) {
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 24rem);
    margin: 1rem 0;
  }
`;

export const ImageGallery = styled.button`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  overflow: hidden;
  position: relative;
`;

export const MapContainer = styled.section`
  width: 100%;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  p {
    padding-left: 1rem;
  }
  @media (min-width: 750px) {
    height: 40rem;
  }
  @media (min-width: 1000px) {
    height: 100%;
    margin-top: 0;
    p {
      display: none;
    }
  }
`;

export const FinancingContainer = styled.section`
  width: 100%;
  margin: 4rem 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  p {
    padding-left: 1rem;
  }
  @media (min-width: 750px) {
    margin: 2rem auto;
    p {
      width: 100%;
      text-align: center;
    }
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
    grid-row: 5 / span 1;
  }
`;

export const FinancingOptions = styled.ul`
  width: 100%;
  padding: 0 1rem 0 2rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  li {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    list-style: disc;
  }
  @media (min-width: 750px) {
    width: 50%;
    margin: 1rem auto;
  }
`;
