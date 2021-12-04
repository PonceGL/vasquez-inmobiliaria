import styled, { keyframes } from "styled-components";

const load = keyframes`
  0% {
    animation-timing-function: ease-out;
    transform: scale(1);
    transform-origin: center center;
  }

  10% {
    animation-timing-function: ease-in;
    transform: scale(0.91);
  }

  17% {
    animation-timing-function: ease-out;
    transform: scale(0.98);
  }

  33% {
    animation-timing-function: ease-in;
    transform: scale(0.87);
  }
`;

const rotate = keyframes`
 0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const scale = keyframes`
 0% {
    transform: rotate(28deg) translateY(-0.2rem) scale(0);
  }

  100% {
    transform: rotate(28deg) translateY(-0.2rem) scale(1);
  }
}
`;

export const Succes = styled.div`
  width: 50rem;
  height: 30rem;
  background-color: var(--admin-main);
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: calc(50% - 15rem);
  left: calc(50% - 25rem);
  z-index: 200000;
  animation: ${load} 2s ease 0s 1 normal forwards;
`;

export const Cirlce = styled.div`
  width: 10rem;
  height: 10rem;
  border: none;
  border-right: 0.5rem solid var(--admin-ring-right);
  border-bottom: 0.5rem solid var(--admin-ring-right);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 20%;
  animation: ${rotate} 1.5s ease-in-out 0s infinite alternate forwards;
`;

export const CirlceLeft = styled(Cirlce)`
  border: none;
  border-left: 0.5rem solid var(--admin-ring-left);
  border-top: 0.5rem solid var(--admin-ring-left);
  animation: ${rotate} 1.5s ease-in-out 0s infinite alternate-reverse forwards;
`;

export const Check = styled.div`
  width: 4rem;
  height: 7rem;
  border-radius: 0 0 1rem 0;
  border-right: 1rem solid #fff;
  border-bottom: 1rem solid #fff;
  position: absolute;
  top: 25%;
  animation: ${scale} 1s cubic-bezier(0.87, 0, 0.13, 1) 0s 1 normal none;
  transform: rotate(28deg) translateY(-0.2rem);
`;

export const Result = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1rem;
`;

export const ResultTitle = styled.h5`
  font-size: 2.2rem;
  color: var(--admin-white);
`;

export const ResultLink = styled.a`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  font-size: 1.6rem;
  color: var(--admin-strong);
  border: 0.2rem solid var(--admin-main);
  background-color: var(--admin-main);
  cursor: pointer;
  border-radius: 1rem;
  opacity: 0.7;
  transition: 0.3s ease-in-out all;
  &:hover {
    opacity: 1;
    color: var(--admin-main);
    border: 0.2rem solid var(--admin-strong);
    background-color: var(--admin-strong);
  }
`;

export const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--admin-white);
  opacity: 0.9;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 199999;
`;
