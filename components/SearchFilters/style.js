import styled from "styled-components";

export const FilterContainer = styled.div`
  width: 100%;
  padding: 1rem;

  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1rem 0.5rem;
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1100px) {
    display: none;
  }
`;

export const Conter = styled.h5`
  font-size: 1.6rem;
  font-weight: 900;
  text-align: center;
  @media (min-width: 750px) {
    grid-column: 2 / span 1;
  }
`;

export const ActionsContainer = styled.div`
  grid-column: 2 / span 1;
  grid-row: 1 / span 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 750px) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
    flex-direction: row;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  overflow: hidden;
  @media (min-width: 750px) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
`;

export const ContainerScroll = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: ${(props) => props.col && `repeat(${props.col}, 1fr)`};
  grid-gap: 0.5rem;
  justify-items: center;
  align-items: center;
  border-right: 0.2rem solid rgba(0, 0, 0, 0.2);

  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Button = styled.button`
  margin: 0 0.3rem;
  padding: 0.2rem 0.6rem;
  text-transform: capitalize;

  border-radius: 1rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;

  ${(props) =>
    props.select
      ? `
  color: var(--white);
  background-color: var(--light-blue);
  border: 0.1rem solid transparent;
  `
      : `
  background: none;
  color: var(--gray);
  border: 0.1rem solid var(--gray);
  `}
  &:hover {
    border: 0.1rem solid var(--light-blue);
  }
`;

export const MoreFiltersButton = styled(Button)`
  width: 100%;
  color: var(--white);
  background-color: var(--light-blue);
  border: 0.1rem solid transparent;
  &:hover {
    color: var(--light-blue);
    background-color: var(--white);
    border: 0.1rem solid var(--light-blue);
  }
`;

export const ButtonFilter = styled.a`
  width: 100%;
  padding: 0.2rem 0.6rem;
  background: none;
  color: var(--white);
  text-transform: capitalize;
  text-align: center;
  background-color: var(--light-blue);
  border: 0.1rem solid transparent;
  border-radius: 1rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--light-blue);
    background-color: var(--white);
    border: 0.1rem solid var(--light-blue);
  }
  ${(props) => props.active && `opacity: 0.4`}
  @media (min-width: 750px) {
    width: 45%;
  }
`;
