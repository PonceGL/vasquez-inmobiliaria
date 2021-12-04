import React from "react";
import Link from "next/link";

// Data
import { admins } from "../../../database/admins";

// Styled Components
import {
  SecctionStyled,
  List,
  ListItem,
  ListLink,
} from "../../../styles/admin/actions/style";

const Actions = ({ user }) => {
  return (
    <SecctionStyled>
      <List>
        <ListItem>
          <Link href="/admin/new-record/house">
            <ListLink>Registrar nueva propiedad</ListLink>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/admin/new-record/subdivision">
            <ListLink>Nuevo fraccionamiento</ListLink>
          </Link>
        </ListItem>
        {admins && (
          <>
            {admins.includes(user.email) && (
              <ListItem>
                <Link href="/admin/partners">
                  <ListLink>Colaboradores</ListLink>
                </Link>
              </ListItem>
            )}
          </>
        )}
      </List>
    </SecctionStyled>
  );
};

export default Actions;
