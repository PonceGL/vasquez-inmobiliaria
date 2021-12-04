import styled from "styled-components";

export const MainStyled = styled.main`
  grid-column: 2 / span 1;
  width: 100%;
  height: 98vh;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: min-content auto; */
  grid-auto-rows: min-content;
  grid-gap: 2rem;
  justify-items: center;
  align-items: start;
  background-color: var(--admin-bg);
  border-radius: 2rem;
  transition: ease-in-out 0.3s all;

  h1 {
    grid-column: 1 / span 2;
    width: 100%;
    text-align: center;
  }

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 0;
  }
`;

export const DataInformation = styled.section`
  grid-column: 1 / span 1;
  width: 100%;
  /* height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; */
`;

export const FormContainer = styled(DataInformation)`
  grid-column: 2 / span 1;
`;

export const RecordsConatiner = styled.section`
  width: 100%;
  padding: 2rem 1rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  border-radius: 1rem;
  background-color: var(--admin-white);
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  transition: 0.3s ease-in-out all;
`;

export const RecordsConatinerWhatsApp = styled(RecordsConatiner)`
  align-items: flex-start;
  h4 {
    margin-bottom: 0.4rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--admin-main);
  }
`;
