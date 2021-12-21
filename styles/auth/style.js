import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const LogoContainer = styled.div`
  width: 20rem;
  height: 20rem;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Logo -----------------------------------

// export const LogoProvisional = styled.div`
//   width: 10rem;
//   height: 10rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: var(--admin-main);
//   border-radius: 2rem;
//   position: relative;
//   transition: 0.3s ease-in-out all;
//   &:after {
//     content: "\\0056";
//     font-size: 8rem;
//     line-height: 8rem;
//     color: var(--admin-bg);
//     text-align: center;
//     position: absolute;
//     left: 0.4rem;
//     transition: 0.3s ease-in-out all;
//   }
//   &:before {
//     content: "\\0047";
//     font-size: 8rem;
//     color: var(--admin-bg);
//     line-height: 8rem;
//     text-align: center;
//     position: absolute;
//     right: 0.2rem;
//     transition: ease-in-out 0.3s all;
//   }
// `;

export const LinkToHome = styled.a`
  padding: 1rem 5rem;
  margin: 2rem 1rem;
  background-color: var(--light-blue);
  color: var(--white);
  font-size: 2rem;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  transition: 0.3s ease-in-out all;
  &:hover {
    background-color: #2984ef;
  }
`;
