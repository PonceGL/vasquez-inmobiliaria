import styled from "styled-components";

export const SelectContainer = styled.div`
  width: 90%;
  height: 5rem;
  margin: 2rem auto;
  padding: 1rem;
  color: var(--white);
  border: 0.1rem solid var(--white);
  background-color: rgba(229, 229, 229, 0.2);
  border-radius: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: 0.3s ease-in-out all;
  &:after {
    position: absolute;
    content: "";
    top: 2rem;
    right: 2rem;
    width: 0;
    height: 0;
    border: 0.6rem solid transparent;
    border-color: var(--white) transparent transparent transparent;
  }
  ${(props) => props.open && `background: rgba(229, 229, 229, 0.8);`}
  select {
    display: none;
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

export const Conatiner = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: rgba(229, 229, 229, 0.8);
  border: 0.1rem solid var(--white);
  border-radius: 3rem;
  position: absolute;
  top: 110%;
  opacity: 0;
  z-index: 3;
  transition: 0.3s ease-in-out all;
  ${(props) => props.open && `opacity: 1;`}
`;

export const Default = styled.p`
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  color: var(--white);
  cursor: pointer;
`;

export const SelectItems = styled.p`
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  color: var(--black);
  cursor: pointer;
`;
