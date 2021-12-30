import styled from "styled-components";

export const Container = styled.section`
  grid-column: 1 / span 1;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  p {
    margin: 1rem 0;
    text-align: justify;
  }
  @media (min-width: 1000px) {
    width: 80%;
  }
`;
