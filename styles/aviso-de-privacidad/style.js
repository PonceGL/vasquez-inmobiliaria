import styled from "styled-components";

export const Title = styled.h1`
  margin: 2rem auto;
  text-align: center;
`;

export const Section = styled.section`
  width: 90%;
  margin: 2rem auto 10rem;
  text-align: justify;

  li {
    list-style: inside;
  }

  @media (min-width: 750px) {
    width: 80%;
  }

  @media (min-width: 1000px) {
    width: 70%;
  }

  @media (min-width: 1200px) {
    width: 60%;
  }
`;
