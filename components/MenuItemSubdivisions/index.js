import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Styled-Components
// import { ListItem, LinkItem } from "../Header/style";
import {
  ListItemButton,
  ListButton,
  SubList,
  ListItem,
  LinkItem,
} from "./style";

const MenuItemSubdivisions = ({ subdivisions }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [router]);

  return (
    <ListItemButton>
      <ListButton type="ListButton" onClick={() => setOpen(!open)}>
        Fraccionamientos
      </ListButton>
      <SubList open={open}>
        {subdivisions.map(({ _id, name }) => (
          <ListItem key={_id}>
            <Link href={`/fraccionamiento/${_id}`}>
              <LinkItem>{name}</LinkItem>
            </Link>
          </ListItem>
        ))}
      </SubList>
    </ListItemButton>
  );
};

export default MenuItemSubdivisions;
