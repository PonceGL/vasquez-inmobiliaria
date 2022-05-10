import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  /* max-width: 1500px; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Cover = styled.section`
  width: 100%;
  height: 100vh;
  padding: 1rem;

  color: var(--white);

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    object-fit: cover;
  }
  @media (min-width: 750px) {
    justify-content: center;
  }
  @media (min-width: 1000px) {
    height: calc(100vh - 4.8rem);
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
  }
`;

export const SoccialContainer = styled.div`
  display: none;
  @media (min-width: 750px) {
    width: 90%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;

    position: absolute;
    bottom: 10%;
    z-index: 3;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 3;
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr 1fr;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;

    position: relative;
    bottom: initial;
    z-index: 3;
  }
`;

export const Line = styled.div`
  @media (min-width: 750px) {
    width: 90%;
    border-top: 0.1rem solid var(--white);
  }
  @media (min-width: 1000px) {
    width: 0;
    height: 98%;
    border-left: 0.1rem solid var(--white);
    border-top: none;
  }
`;

export const SoccialIconsContainer = styled.div`
  display: none;
  @media (min-width: 750px) {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    a {
      width: 3.5rem;
      height: 3.5rem;
      margin: 0.5rem;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 50%;
    }
    @media (min-width: 1000px) {
      flex-direction: column;
      justify-content: space-around;
    }
  }
`;

export const CoverInfo = styled.div`
  width: 100%;
  margin-top: 4rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  position: relative;
  z-index: 3;
  h2 {
    width: 100%;
    margin-bottom: 4rem;
    font-size: 2.7rem;
    font-weight: 900;
    text-align: center;
  }
  @media (min-width: 750px) {
    width: 70%;
    margin: 0;
    h2 {
      font-size: 3.2rem;
    }
  }
  @media (min-width: 1000px) {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    width: 100%;
    height: 100%;
    margin-top: 0;
    h2 {
      width: 52vw;
      margin-bottom: 2rem;
      font-size: 4.8rem;
    }
  }
`;

export const CoverActions = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: relative;
  z-index: 4;
  @media (min-width: 1000px) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-columns: 1fr 2fr 1fr;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
  }
`;

export const ButtonsContainer = styled.div`
  width: 80%;
  margin: 1rem auto 6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    margin-top: 1rem;
    color: var(--white);
  }
  @media (min-width: 750px) {
    width: 50%;
  }
  @media (min-width: 1000px) {
    grid-column: 2 / span 1;
    width: 100%;
    margin: 0;
  }
`;

export const TypeWithIcon = styled.button`
  width: 5.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  position: relative;
  svg path {
    transition: 0.3s ease-in-out all;
  }

  ${(props) =>
    props.select
      ? `
      svg path {
        fill: var(--light-blue);
      }
  `
      : `
      svg path {
        fill: var(--white);
      }
  `}
`;

export const SearchButton = styled.a`
  width: 90%;
  height: 5rem;
  margin: 0 1rem;
  padding: 1rem 2rem;
  color: var(--white);
  white-space: nowrap;
  border: 0.1rem solid var(--light-blue);
  background: var(--light-blue);
  border-radius: 3rem;

  display: none;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: 0.3s ease-in-out all;
  @media (min-width: 750px) {
    width: 50%;
  }
  @media (min-width: 1000px) {
    grid-column: 3 / span 1;
    width: fit-content;
    display: flex;
  }
`;

export const InitSearchContainer = styled.div`
  grid-column: 2 / span 1;
  grid-row: 3 / span 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  position: relative;
  z-index: 3;
  a {
    width: 90%;
    height: 5rem;
    padding: 1rem 2rem;
    color: var(--white);
    border: 0.1rem solid var(--light-blue);
    background: var(--light-blue);
    border-radius: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: 0.3s ease-in-out all;
  }
  @media (min-width: 750px) {
    a {
      width: 50%;
    }
  }
  @media (min-width: 1000px) {
    a {
      height: 100%;
    }
  }
`;

export const Filter = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(18, 18, 18, 0.69);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const NewPropertiesContainer = styled.section`
  width: 100%;
  padding: 4rem 1rem;
  background-color: var(--light-gray);
  overflow: hidden;
  h2 {
    margin: 1rem 0;
    font-size: 2rem;
    color: var(--black);
    text-align: center;
  }
  @media (min-width: 1000px) {
    h2 {
      font-size: 3rem;
    }
  }
`;

export const HousesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 65vw);
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2rem;
  }
`;

export const House = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ImageContainer = styled.a`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  border-radius: 0.8rem;
  overflow: hidden;
  position: relative;
  /* img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  } */
`;

export const TitleAndPriceConatiner = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 900;
`;

export const Price = styled.p`
  font-size: 1rem;
`;

export const Address = styled.p`
  width: 100%;
  font-size: 1.2rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export const We = styled.section`
  width: 100%;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const WeItemsContainer = styled.div`
  width: 100%;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    justify-items: center;
    align-items: center;
  }
  @media (min-width: 1000px) {
    width: 80%;
    margin: 6rem auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    justify-items: center;
    align-items: center;
  }
`;

export const Item = styled.div`
  width: 100%;
  margin: 1.5rem auto;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 0.5rem;
  justify-items: start;
  align-items: center;
  @media (min-width: 750px) {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const IconConatiner = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 4.5rem;
    height: 4.5rem;

    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    position: relative;
  }
  @media (min-width: 750px) {
    width: 8rem;
    height: 8rem;
  }
`;

export const TextConatiner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 750px) {
    align-items: center;
  }
`;

export const ItemTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--dark-blue);
`;

export const ItemText = styled.p`
  text-align: start;
  color: var(--black);
  @media (min-width: 750px) {
    text-align: center;
  }
`;
