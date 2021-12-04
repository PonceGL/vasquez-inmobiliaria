import styled from "styled-components";

export const Conatiner = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const View = styled.div`
  width: 90vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @media (min-width: 750px) {
    width: 90vw;
    height: 90vh;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const AltText = styled.p`
  width: 90%;
  margin-top: 1rem;
  color: var(--white);
  text-align: center;
  z-index: 2;
`;

export const Controls = styled.div`
  width: 140%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 14rem;
  z-index: 4;
  @media (min-width: 750px) {
    width: 100%;
  }
  @media (min-width: 750px) {
    bottom: 0;
  }
`;

export const Back = styled.div`
  border: 0.1rem solid rgb(255 255 255 / 8%);
  width: 20rem;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background-color: rgb(255 255 255 / 3%);
  cursor: pointer;
  border-radius: 50%;
  opacity: 0.4;
  :after {
    content: "\\25B2";
    font-size: 3rem;
    color: var(--white);
    text-align: center;
    transform: rotate(275deg) translateY(-0.2rem);
  }
  @media (min-width: 750px) {
    opacity: 0.8;
  }
  @media (min-width: 750px) {
    border: 0.1rem solid rgb(255 255 255 / 5%);
    background-color: rgb(255 255 255 / 2%);
  }
`;

export const Next = styled(Back)`
  :after {
    content: "\\25B2";
    font-size: 3rem;
    color: var(--white);
    text-align: center;
    transform: rotate(90deg) translateY(-0.2rem);
  }
`;

export const Close = styled.div`
  border: 0.1rem solid var(--white);
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-size: 2rem;
  cursor: pointer;
  border: 0.1rem solid rgb(255 255 255 / 20%);
  background-color: rgb(255 255 255 / 10%);
  border-radius: 50%;
  opacity: 0.5;
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 4;
  :after {
    content: "\\00D7";
    font-size: 3rem;
    color: var(--white);
    text-align: center;
  }
  @media (min-width: 750px) {
    opacity: 0.8;
  }
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 90%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
