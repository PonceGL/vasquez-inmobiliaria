import styled from "styled-components";

export const SecctionStyled = styled.section`
  width: 100%;
  min-height: 20vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--admin-white);
  border-radius: 2rem;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  position: relative;
  transition: ease-in-out 0.3s all;
`;

export const ListContainer = styled.ul`
  width: 100%;
  padding: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 25rem;
  grid-gap: 3rem;
  justify-items: center;
  align-items: center;

  @media (max-width: 750px) {
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
