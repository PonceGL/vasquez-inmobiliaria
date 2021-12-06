import { useEffect, useState } from "react";
import Axios from "axios";

// Components
import Partners from "../partners/partners";

// styled Components
import { SectionStyled } from "../../../styles/admin/listPartners/style";

const ListPartners = () => {
  const [users, setUsers] = useState([]);
  const [changePartners, setChangePartners] = useState(false);

  useEffect(() => {
    const getUSers = async () => {
      const { data } = await Axios.get("/api/firebase");

      if (data.users) {
        setUsers([]);
        data.users.forEach((userJson) => {
          const user = {
            uid: userJson.uid,
            email: userJson.email,
            emailVerified: userJson.emailVerified,
            displayName: userJson.displayName,
            photoURL: userJson.photoURL,
            phoneNumber: userJson.phoneNumber,
            disabled: userJson.disabled,
          };
          setUsers((users) => [...users, user]);
        });
      }
    };
    getUSers();
  }, [changePartners]);

  return (
    <SectionStyled>
      {users.length > 0 && (
        <>
          {users.map((user) => (
            <Partners
              key={user.uid}
              {...user}
              changePartners={changePartners}
              setChangePartners={setChangePartners}
            />
          ))}
        </>
      )}
    </SectionStyled>
  );
};

export default ListPartners;
