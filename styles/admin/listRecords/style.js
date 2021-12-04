import styled from "styled-components";

export const ButtonDelete = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: #ff0000;
  border: none;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  opacity: 0;
  transition: 0.5s ease-in-out all;
  transition-delay: 0.1s;

  position: absolute;
  top: 0;
  right: 0;

  &:after {
    content: "\\00D7";
    font-size: 2rem;
    line-height: 2rem;
    color: #000000;
    text-align: center;
  }
`;

export const Record = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  border-bottom: 0.1rem solid var(--admin-text);
  position: relative;
  h4 {
    margin-bottom: 0.4rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--admin-main);
  }
  p {
    margin: 0.4rem 0;
    font-weight: 400;
    span:not(:first-child) {
      margin: 0 0.5rem;
    }
  }
  &:hover {
    ${ButtonDelete} {
      opacity: 1;
    }
  }
`;

export const TextModal = styled.p`
  margin: 1rem 0;
  text-align: center;
  font-size: 1.6rem;
  color: var(--admin-text);
  span {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--admin-main);
  }
`;
