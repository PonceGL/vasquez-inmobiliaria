import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
  transition: 0.3s ease-in-out all;
  &:hover {
    background-color: var(--light-gray);
  }
`;

export const ImageContainer = styled.a`
  width: 100%;
`;

export const Info = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  p {
    color: var(--black);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
`;
