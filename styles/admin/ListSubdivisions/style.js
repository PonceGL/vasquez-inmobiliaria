import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

// ::::::::::::::::::::::::

export const Divicion = styled.div`
  width: 100%;
  padding: 6rem 2rem;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  justify-items: center;
  align-items: start;
  background-color: var(--admin-white);
  border-radius: 2rem;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  overflow: hidden;
  position: relative;
  transition: ease-in-out 0.3s all;
`;

export const Info = styled.div`
  width: 100%;
  transition: ease-in-out 0.3s all;
  p {
    margin: 0.5rem 0;
  }
`;

export const Name = styled.p`
  font-size: 2rem;
`;

export const Images = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export const Logo = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

export const ImageContainer = styled.div`
  width: 10rem;
  height: 10rem;
  margin: 1rem;
  border: 0.1rem solid var(--admin-text);
  border-radius: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
