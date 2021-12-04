import styled from "styled-components";

export const UploadImageButton = styled.button`
  ${(props) =>
    props.emty &&
    `
    grid-column: 2 / span 3;
  `}
  width: 100%;
  height: 100%;
  padding: 1rem 0.5rem;
  color: var(--admin-text);
  font-size: 2rem;
  text-align: center;
  background-color: var(--admin-bg);
  border: 0.2rem dotted var(--admin-text);
  border-radius: 1rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--admin-strong);
    border: 0.2rem solid var(--admin-main);
    background-color: var(--admin-main);
  }
`;
