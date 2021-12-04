import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 0;
  right: ${(props) => (props.open ? `0` : `-100%`)};
  background: var(--white);
  z-index: 1000;
  transition: 0.3s ease-in-out all;
  @media (min-width: 1100px) {
    width: 32rem;
    min-height: initial;
    height: 70vh;
    justify-content: space-between;
    top: 8rem;
    right: 7.5rem;
  }

  @media (min-width: 1200px) {
    width: 35rem;
  }

  @media (min-width: 1500px) {
    width: 40rem;
  }

  @media (min-width: 2000px) {
    width: 45rem;
  }
`;

export const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 1001;
  transition: 0.3s ease-in-out all;
  :after {
    content: "\\279E";
    font-size: 3rem;
    color: var(--dark-blue);
    text-align: center;
    transform: rotate(180deg);
  }
  @media (min-width: 1100px) {
    display: none;
  }
`;

export const TypeContainer = styled.section`
  width: 100%;
  padding: 1rem 0 3rem;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  border-bottom: 0.1rem solid var(--admin-bg);
  h4 {
    width: 100%;
    margin-bottom: 1rem;
    text-align: center;
  }
  svg path {
    transition: 0.3s ease-in-out all;
  }
  p {
    margin-top: 1rem;
    color: var(--dark-blue);
  }
  @media (min-width: 750px) {
    width: 50%;
  }
  @media (min-width: 1000px) {
    width: 100%;
    padding: 1rem;
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

  ${(props) =>
    props.select
      ? `
      svg path {
        fill: var(--light-blue);
      }
  `
      : `
      svg path {
        fill: var(--dark-blue);
      }
  `}
`;

export const MoreType = styled.div`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const Type = styled.button`
  width: fit-content;
  padding: 0.5rem;
  margin: 0 0.4rem;
  border-radius: 1rem;
  text-align: center;
  text-transform: capitalize;
  background: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.select
      ? `
      color: var(--light-blue);
      border: 0.1rem solid var(--light-blue);
  `
      : `
      color: var(--dark-blue);
      border: 0.1rem solid var(--dark-blue);
  `}
`;

export const PriceContainer = styled(TypeContainer)`
  margin: 2rem auto;
  @media (min-width: 1000px) {
    padding: 1rem;
    margin: 0;
  }
`;

export const Price = styled.div`
  width: 45%;
  padding: 0.2rem 0;
  border: 0.1rem solid var(--black);
  border-radius: 1rem;
  text-align: center;
  background: none;
  input {
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: center;
    background: none;
    border: none;
    outline: none;
    position: relative;
    &::placeholder {
      text-align: center;
    }
  }
  p {
    margin: 0;
    text-align: center;
    font-size: 1rem;
  }
`;

export const TerrainContainer = styled(TypeContainer)`
  margin: 2rem auto;

  @media (min-width: 1000px) {
    padding: 1rem;
    margin: 0;
  }
`;

export const OtherContainer = styled(TypeContainer)`
  margin: 2rem auto;
  @media (min-width: 1000px) {
    padding: 1rem;
    margin: 0;
  }
  ${(props) =>
    props.hide &&
    `
    min-height: 10rem;
  `}
`;

export const Other = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  justify-items: start;
  align-items: center;
`;

export const OtherButtons = styled.div`
  width: 75%;
  margin-left: auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.2rem;
  justify-items: center;
  align-items: center;
  p {
    margin: 0;
  }
`;

export const CounterButton = styled.button`
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 0.1rem solid var(--dark-blue);
  border-radius: 50%;
  background: none;
  outline: none;
  cursor: pointer;
  &:after {
    content: "\\2212";
    font-size: 3rem;
    color: var(--dark-blue);
    text-align: center;
    transform: rotate(180deg);
  }
`;

export const CounterButtonMore = styled(CounterButton)`
  &:after {
    content: "\\002B";
    font-size: 3rem;
    color: var(--dark-blue);
    text-align: center;
    transform: rotate(180deg);
  }
`;

export const OtherDisplay = styled.p`
  color: var(--gray);
  font-weight: 700;
`;

export const LastSection = styled.section`
  width: 100%;
  padding: 1rem 0 3rem;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 0.5rem;
  justify-items: center;
  align-items: center;
  button {
    width: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 1rem;
    outline: none;
    cursor: pointer;
    position: relative;
  }
  @media (min-width: 750px) {
    width: 50%;
  }
  @media (min-width: 1000px) {
    width: 100%;
    padding: 1rem;
    margin: 0;
  }
`;

export const ClearButton = styled.button`
  color: var(--gray);
`;

export const ApplyButton = styled.button`
  color: var(--white);
  background: var(--light-blue);
`;
