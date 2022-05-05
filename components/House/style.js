import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  @media (min-width: 750px) {
    height: 100%;
    margin: 0;
  }
  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: stretch;
    background: var(--white);
    box-shadow: 0.2rem 0.4rem 1.5rem rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
    overflow: hidden;
  }
  @media (min-width: 1200px) {
    min-height: 20rem;
  }
`;

export const ImageContainer = styled.a`
  width: 100%;
  height: 25rem;
  position: relative;
  @media (min-width: 750px) {
    height: 20rem;
  }
  @media (min-width: 1000px) {
    height: 100%;
    img {
      opacity: 0.8;
      transition: 0.3s ease-in-out all;
    }
    &:hover {
      img {
        opacity: 1;
      }
    }
  }
`;

export const IconsContainer = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: rgba(229, 229, 229, 0.7);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

export const IconInfo = styled.div`
  width: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  /* svg path {
    fill: var(--light-blue);
  } */
  p {
    color: var(--black);
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Description = styled.p`
  width: 100%;
  margin: 1rem 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

export const Price = styled.p`
  width: 100%;
  font-size: 1.8rem;
  font-weight: 700;
`;
