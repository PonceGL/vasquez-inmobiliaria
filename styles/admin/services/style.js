import styled from "styled-components";

export const Container = styled.div`
  grid-column: 1 / span 2;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  h4 {
    width: 100%;
    padding: 1rem 1rem 1rem 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--admin-text);
  }
  p {
    padding: 0.2rem;
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
`;
