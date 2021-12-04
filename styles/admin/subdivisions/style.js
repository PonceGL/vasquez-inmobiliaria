import styled from "styled-components";

export const SubdivisionsStyled = styled.section`
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h3 {
    font-size: 2rem;
    margin: 1rem 0;
    text-align: left;
  }
  @media (max-width: 1000px) {
    height: initial;
    margin-bottom: 2rem;
  }
`;

export const SubdivisionsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const SubdivisionEmpty = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: var(--admin-white);
  border-radius: 2rem;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 100%;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
  transition: ease-in-out 0.3s all;
  p {
    font-size: 2rem;
    font-weight: 700;
    color: var(--admin-text);
    transition: ease-in-out 0.3s all;
  }
`;

export const Action = styled.a`
  padding: 1rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--admin-text);
  background-color: var(--admin-white);
  border-radius: 1rem;
  transition: ease-in-out 0.3s all;
`;
