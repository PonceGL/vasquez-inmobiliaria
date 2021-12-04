import styled from "styled-components";

export const ImagePreviewStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${(props) =>
    props.border &&
    `
    border: 0.4rem solid var(--admin-focus);    
  `}
`;

export const DeleteButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: #ff6363;
  border: 0.1rem solid #eb0000;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.4;
  transition: 0.3s ease-in-out all;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 1;
  &:after {
    content: "\\00D7";
    font-size: 2rem;
    line-height: 2rem;
    color: #000000;
    text-align: center;
  }
  &:hover {
    background-color: #fdb827;
    border: 0.1rem solid #fdb827;
    opacity: 1;
  }
`;

export const MainImageButton = styled.button`
  width: 4rem;
  height: 4rem;
  background-color: #b5d7ff;
  border: 0.1rem solid #00479a;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.3s ease-in-out all;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  z-index: 1;
  opacity: 0.4;
  &:after {
    ${(props) => (props.main ? `content: "\\00D7"` : `content: "\\2600"`)};
    font-size: 3rem;
    line-height: 3rem;
    color: #00479a;
    text-align: center;
    transition: 0.3s ease-in-out all;
  }
  &:hover {
    opacity: 1;
  }
`;
