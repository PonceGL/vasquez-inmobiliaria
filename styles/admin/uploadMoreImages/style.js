import styled from "styled-components";

export const MoreImageContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 10rem;
  grid-auto-rows: 10rem;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
`;

export const UploadImageButton = styled.button`
  grid-column: 1 / span 3;
  width: 100%;
  padding: 1rem;
  color: var(--admin-text);
  font-size: 1.2rem;
  text-align: center;
  background-color: var(--admin-bg);
  border: 0.1rem solid var(--admin-text);
  border-radius: 0.8rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--admin-strong);
    border: 0.1rem solid var(--admin-main);
    background-color: var(--admin-main);
  }
`;
