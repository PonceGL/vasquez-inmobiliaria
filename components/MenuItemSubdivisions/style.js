import styled from "styled-components";

export const ListItemButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (min-width: 750px) {
    width: fit-content;
    margin: 0.5rem;
  }
`;

export const SubList = styled.ul`
  width: 100%;
  @media (min-width: 750px) {
    width: fit-content;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: var(--white);
    position: absolute;
    top: 115%;
    border-radius: 0.5rem;
    box-shadow: 0.5rem 1rem 2rem 0rem rgb(38 38 38 / 60%);
    ${(props) => (props.open ? "display: flex;" : "display: none;")}
  }
`;

export const ListButton = styled.button`
  display: none;
  padding: 0.5rem 0;
  background: none;
  border: none;
  outline: none;
  color: var(--black);
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--light-blue);
  }
  @media (min-width: 750px) {
    width: 100%;
    display: block;
    color: var(--black);
    font-size: 1.4rem;
    font-weight: 900;
    text-align: left;
  }
`;

export const ListItem = styled.li`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    width: fit-content;
  }
`;

export const LinkItem = styled.a`
  color: var(--black);
  font-size: 2rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--light-blue);
  }
  @media (min-width: 750px) {
    padding: 0.5rem 0;
    color: var(--black);
    font-size: 1.4rem;
    font-weight: 900;
  }
`;
