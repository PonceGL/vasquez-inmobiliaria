import styled from "styled-components";

export const Form = styled.form`
  grid-column: 2 / span 1;
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  @media (min-width: 1000px) {
    width: 80%;
  }
`;

export const InputText = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;

  border-radius: 2rem;
  color: var(--black);
  border: 0.1rem solid rgba(0, 0, 0, 1);

  outline: none;
  transition: 0.3s ease-in-out all;
  &::placeholder {
    color: var(--black);
    opacity: 0.5;
  }
`;

export const TextareaTextBase = styled.textarea`
  width: 100%;
  min-height: 20rem;
  padding: 1rem;
  margin: 0.5rem 0;

  border-radius: 2rem;
  color: var(--black);
  border: 0.1rem solid rgba(0, 0, 0, 1);

  outline: none;
  resize: vertical;
  transition: 0.3s ease-in-out all;
  &::placeholder {
    color: var(--black);
    opacity: 0.5;
  }
`;

export const ImagesPreview = styled.div`
  grid-column: 1 / span 2;
  width: 100%;
  min-width: 35rem;
  padding: 0.5rem;

  display: grid;
  grid-template-columns: repeat(2, minmax(10rem, 1fr));
  grid-auto-rows: 20rem;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 750px) {
    grid-template-columns: repeat(3, minmax(10rem, 1fr));
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(5, minmax(15rem, 1fr));
  }
`;

export const SendButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;

  border-radius: 2rem;
  color: var(--white);
  border: none;
  background: var(--light-blue);
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
`;

export const InputFile = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

export const InputLabel = styled.label`
  width: 100%;
  padding: 1rem;
  margin: 2rem 0;
  display: block;
  position: relative;
  border-radius: 2rem;
  background: var(--light-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-blue);
  cursor: pointer;
  transition: 0.3s ease-in-out all;
`;

export const FileName = styled.p`
  position: absolute;
  bottom: -35px;
  left: 10px;
  font-size: 0.85rem;
  color: #555;
  transition: 0.3s ease-in-out all;
`;

export const SuccessMessage = styled.div`
  width: 100%;
  min-height: 20rem;
  padding: 1rem;
  margin: 2rem auto;

  color: var(--black);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  h4 {
    font-size: 2rem;
    text-align: center;
  }

  p {
    text-align: center;
  }
`;
