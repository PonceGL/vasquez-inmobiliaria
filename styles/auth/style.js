import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const LogoContainer = styled.section`
  width: 100%;
  min-height: 10rem;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Logo -----------------------------------

export const LogoProvisional = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--admin-main);
  border-radius: 2rem;
  position: relative;
  transition: 0.3s ease-in-out all;
  &:after {
    content: "\\0056";
    font-size: 8rem;
    line-height: 8rem;
    color: var(--admin-bg);
    text-align: center;
    position: absolute;
    left: 0.4rem;
    transition: 0.3s ease-in-out all;
  }
  &:before {
    content: "\\0047";
    font-size: 8rem;
    color: var(--admin-bg);
    line-height: 8rem;
    text-align: center;
    position: absolute;
    right: 0.2rem;
    transition: ease-in-out 0.3s all;
  }
`;
