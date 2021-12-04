import styled from "styled-components";

export const MainImage = styled.section`
  width: 100%;
  height: 50vh;
  background-image: url(https://res.cloudinary.com/duibtuerj/image/upload/v1638477898/vasquez-inmobiliaria/brand/about_rq0hq1.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  position: relative;
  z-index: 1;
  h1 {
    width: 100%;
    font-size: 3rem;
    font-weight: 400;
    text-align: center;
    color: var(--white);
    position: absolute;
    top: calc(50% - 2.5rem);
    left: 0;
    z-index: 3;
  }
  @media (min-width: 1000px) {
    h1 {
      font-size: 5rem;
    }
  }
`;

export const BackgroundCover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #424242;
  opacity: 0.8;
  z-index: 2;
`;

export const Description = styled.section`
  width: 95%;
  padding: 1rem;
  margin: 2rem auto;
  border: 0.1rem solid var(--light-blue);
  background-color: var(--white);
  transform: translateY(-8rem);
  position: relative;
  z-index: 2;

  p {
    font-size: 1.5rem;
    text-align: justify;
  }

  span {
    font-weight: 500;
  }
  @media (min-width: 750px) {
    width: 60%;
    transform: translateY(-10rem);
    p {
      font-size: 1.7rem;
    }
  }

  @media (min-width: 1000px) {
    width: 45%;
    padding: 2rem;
    transform: translateY(-12rem);
    p {
      font-size: 1.8rem;
    }
  }
`;
