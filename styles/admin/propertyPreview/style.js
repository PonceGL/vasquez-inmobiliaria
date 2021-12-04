import styled from "styled-components";

export const Conatiner = styled.section`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  justify-items: center;
  align-items: center;
  @media (max-width: 1000px) {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Info = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  border-radius: 1rem;
  background-color: var(--admin-white);
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  transition: 0.3s ease-in-out all;
  p {
    margin: 0.5rem 0;
  }
`;

export const ServicesConatiner = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  p {
    margin-right: 0.8rem;
  }
`;

export const PhotosConatiner = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ButtonActions = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  font-size: 1.4rem;
  text-align: center;
  color: var(--admin-main);
  background-color: var(--admin-white);
  border-radius: 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: ease-in-out 0.3s all;
  &:hover {
    color: var(--admin-white);
    background-color: var(--admin-main);
  }
`;

export const ButtonDelete = styled(ButtonActions)`
  &:hover {
    color: var(--admin-white);
    background-color: red;
  }
`;

export const LinkActions = styled.a`
  width: 100%;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  font-size: 1.4rem;
  text-align: center;
  color: var(--admin-main);
  background-color: var(--admin-white);
  border-radius: 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: ease-in-out 0.3s all;
  &:hover {
    color: var(--admin-white);
    background-color: var(--admin-main);
  }
`;

export const TextModal = styled.p`
  margin: 1rem 0;
  text-align: center;
  font-size: 1.6rem;
  color: var(--admin-text);
  span {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--admin-main);
  }
`;
