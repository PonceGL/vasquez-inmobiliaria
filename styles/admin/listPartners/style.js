import styled from "styled-components";

export const SectionStyled = styled.section`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;
