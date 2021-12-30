import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
    margin-bottom: 1rem;
  }
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    justify-items: center;
    align-items: start;
    h1 {
      grid-column: 1 / span 2;
    }
  }
  @media (min-width: 1000px) {
    margin: 2rem 0;
  }
`;
