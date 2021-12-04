import styled from "styled-components";

export const GaleryContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  /* overflow: hidden; */
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    width: 100%;
  }
`;

export const PointsConatiner = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  left: 0;
  z-index: 2;
  @media (min-width: 750px) {
    display: none;
  }
`;

export const Points = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0 0.2rem;
  background: var(--light-blue);
  border-radius: 50%;
  border: 0.1rem solid var(--white);
`;

export const ConterImagesContainer = styled.div`
  display: none;
  @media (min-width: 750px) {
    width: 18rem;
    height: 18rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgb(0 0 0 / 45%);
    bottom: 0;
    right: 0;
    z-index: 2;
    p {
      font-size: 5rem;
      cursor: pointer;
      color: var(--white);
    }
  }
  @media (min-width: 1000px) {
    grid-column: 4 / span 1;
    grid-row: 2 / span 1;
    width: 100%;
    height: 100%;
  }
`;

export const ContainerScroll = styled.div`
  height: 30rem;
  display: grid;
  grid-template-columns: ${(props) =>
    props.col ? `repeat(${props.col}, 100vw)` : `1fr`};
  overflow-x: scroll;
  position: relative;
  @media (min-width: 750px) {
    width: 100%;
    height: 35rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr;
  }
  @media (min-width: 1000px) {
    height: 45rem;
  }
`;

export const ImageMainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;
