import React, { useCallback } from "react";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { adminPermission } from "../redux/actions/ProductAction";

export interface IAdmin {
  id: number;
  permissionUser: string;
}

interface props {
  id: number;
  selected: boolean;

  permissionUser: string;
}

const AdminPermission = ({ id, selected, permissionUser }: props) => {
  const dispatch = useDispatch();

  const handleAdmin = useCallback(() => {
    dispatch(adminPermission({ id, permissionUser }));
  }, [id, dispatch, permissionUser]);

  return (
    <>
      <IconButton onClick={handleAdmin}>
        {selected ? (
          <AdminPanelSettingsIcon color="success" />
        ) : (
          <AdminPanelSettingsIcon color="primary" />
        )}
      </IconButton>
    </>
  );
};

export default AdminPermission;
