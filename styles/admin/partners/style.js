import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 var(--admin-shadow);
  transition: ease-in-out 0.3s all;
  @media (max-width: 1000px) {
    width: 80%;
  }
`;

export const ImageContainer = styled.div`
  border: 0.2rem solid var(--admin-strong);
  width: 100%;
  min-height: 18rem;

  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--admin-bg);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%237F3' stroke-width='1' stroke-opacity='0.05'%3E%3Crect x='-40' y='40' width='75' height='75'/%3E%3Crect x='-35' y='45' width='65' height='65'/%3E%3Crect x='-30' y='50' width='55' height='55'/%3E%3Crect x='-25' y='55' width='45' height='45'/%3E%3Crect x='-20' y='60' width='35' height='35'/%3E%3Crect x='-15' y='65' width='25' height='25'/%3E%3Crect x='-10' y='70' width='15' height='15'/%3E%3Crect x='-5' y='75' width='5' height='5'/%3E%3Crect width='35' height='35'/%3E%3Crect x='5' y='5' width='25' height='25'/%3E%3Crect x='10' y='10' width='15' height='15'/%3E%3Crect x='15' y='15' width='5' height='5'/%3E%3Crect x='40' width='75' height='75'/%3E%3Crect x='45' y='5' width='65' height='65'/%3E%3Crect x='50' y='10' width='55' height='55'/%3E%3Crect x='55' y='15' width='45' height='45'/%3E%3Crect x='60' y='20' width='35' height='35'/%3E%3Crect x='65' y='25' width='25' height='25'/%3E%3Crect x='70' y='30' width='15' height='15'/%3E%3Crect x='75' y='35' width='5' height='5'/%3E%3Crect x='40' y='80' width='35' height='35'/%3E%3Crect x='45' y='85' width='25' height='25'/%3E%3Crect x='50' y='90' width='15' height='15'/%3E%3Crect x='55' y='95' width='5' height='5'/%3E%3Crect x='120' y='-40' width='75' height='75'/%3E%3Crect x='125' y='-35' width='65' height='65'/%3E%3Crect x='130' y='-30' width='55' height='55'/%3E%3Crect x='135' y='-25' width='45' height='45'/%3E%3Crect x='140' y='-20' width='35' height='35'/%3E%3Crect x='145' y='-15' width='25' height='25'/%3E%3Crect x='150' y='-10' width='15' height='15'/%3E%3Crect x='155' y='-5' width='5' height='5'/%3E%3Crect x='120' y='40' width='35' height='35'/%3E%3Crect x='125' y='45' width='25' height='25'/%3E%3Crect x='130' y='50' width='15' height='15'/%3E%3Crect x='135' y='55' width='5' height='5'/%3E%3Crect y='120' width='75' height='75'/%3E%3Crect x='5' y='125' width='65' height='65'/%3E%3Crect x='10' y='130' width='55' height='55'/%3E%3Crect x='15' y='135' width='45' height='45'/%3E%3Crect x='20' y='140' width='35' height='35'/%3E%3Crect x='25' y='145' width='25' height='25'/%3E%3Crect x='30' y='150' width='15' height='15'/%3E%3Crect x='35' y='155' width='5' height='5'/%3E%3Crect x='200' y='120' width='75' height='75'/%3E%3Crect x='40' y='200' width='75' height='75'/%3E%3Crect x='80' y='80' width='75' height='75'/%3E%3Crect x='85' y='85' width='65' height='65'/%3E%3Crect x='90' y='90' width='55' height='55'/%3E%3Crect x='95' y='95' width='45' height='45'/%3E%3Crect x='100' y='100' width='35' height='35'/%3E%3Crect x='105' y='105' width='25' height='25'/%3E%3Crect x='110' y='110' width='15' height='15'/%3E%3Crect x='115' y='115' width='5' height='5'/%3E%3Crect x='80' y='160' width='35' height='35'/%3E%3Crect x='85' y='165' width='25' height='25'/%3E%3Crect x='90' y='170' width='15' height='15'/%3E%3Crect x='95' y='175' width='5' height='5'/%3E%3Crect x='120' y='160' width='75' height='75'/%3E%3Crect x='125' y='165' width='65' height='65'/%3E%3Crect x='130' y='170' width='55' height='55'/%3E%3Crect x='135' y='175' width='45' height='45'/%3E%3Crect x='140' y='180' width='35' height='35'/%3E%3Crect x='145' y='185' width='25' height='25'/%3E%3Crect x='150' y='190' width='15' height='15'/%3E%3Crect x='155' y='195' width='5' height='5'/%3E%3Crect x='160' y='40' width='75' height='75'/%3E%3Crect x='165' y='45' width='65' height='65'/%3E%3Crect x='170' y='50' width='55' height='55'/%3E%3Crect x='175' y='55' width='45' height='45'/%3E%3Crect x='180' y='60' width='35' height='35'/%3E%3Crect x='185' y='65' width='25' height='25'/%3E%3Crect x='190' y='70' width='15' height='15'/%3E%3Crect x='195' y='75' width='5' height='5'/%3E%3Crect x='160' y='120' width='35' height='35'/%3E%3Crect x='165' y='125' width='25' height='25'/%3E%3Crect x='170' y='130' width='15' height='15'/%3E%3Crect x='175' y='135' width='5' height='5'/%3E%3Crect x='200' y='200' width='35' height='35'/%3E%3Crect x='200' width='35' height='35'/%3E%3Crect y='200' width='35' height='35'/%3E%3C/g%3E%3C/svg%3E");

  border-radius: 2rem;
  overflow: hidden;
  @media (max-width: 1000px) {
    width: 70%;
    min-height: 10rem;
  }
`;

export const NoImage = styled.div`
  width: 15rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 1rem 0;
    font-size: 18rem;
    font-weight: 700;
    color: var(--admin-text);
    opacity: 0.3;
    position: relative;
    z-index: 1;
  }
`;

export const Name = styled.h3`
  margin: 1rem 0;
  font-size: 1.6rem;
  color: var(--admin-text);
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Info = styled.p`
  margin: 0.5rem 0;
  font-size: 1.4rem;
  color: ${(props) => (props.ok ? `var(--admin-text)` : `#ff0000`)};
`;

export const ButtonAction = styled.button`
  width: 100%;
  margin: 0.5rem;
  padding: 0.5rem;
  color: var(--admin-strong);
  background-color: var(--admin-main);
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 0.5rem;
  opacity: 0.8;
  transition: ease-in-out 0.3s all;
  &:hover {
    opacity: 1;
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
