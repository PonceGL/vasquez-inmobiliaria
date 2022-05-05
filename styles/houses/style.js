import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  /* max-width: 1400px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 750px) {
    width: 90%;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4rem 2rem;
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    min-height: 80vh;
  }
  @media (min-width: 2000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Filling = styled.div`
  display: none;
  @media (min-width: 1100px) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 4;
    width: 100%;
    height: 100%;
    display: block;
  }
  @media (min-width: 2000px) {
    grid-column: 4 / span 1;
  }
`;

export const Empty = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 1rem 0;
  }
  p {
    margin: 0.5rem 0;
    span {
      font-weight: 600;
    }
  }
`;
