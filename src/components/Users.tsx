import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useGSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/actions/ProductAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import AdminPermission from "./AdminPermission";

const Users = () => {
  const users = useGSelector((state) => state.userState.userDetails);
  const LoginUserName = useGSelector((state) => state.userState.userName);

  const searchUser = useGSelector((state) => state.searchState.text);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };
  const handleUpdateUser = (userId: number) => {
    navigate(`/signUp/${userId}`);
  };

  const filteredUser = useMemo(() => {
    return users.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchUser.toLowerCase()) ||
        searchUser.toLowerCase().includes(user.userName.toLowerCase())
    );
  }, [users, searchUser]);

  return (
    <List>
      {filteredUser.map((user) => (
        <ListItem key={user.userId}>
          <Stack direction="row" spacing={2}>
            <Avatar alt={user.userName} src="/static/images/avatar/1.jpg" />
            <ListItemText
              primary={user.emailAddress}
              secondary={user.userName}
            />
          </Stack>

          <ListItemSecondaryAction>
            <AdminPermission
              id={user.userId}
              selected={user.admin}
              permissionUser={LoginUserName}
            />
            <IconButton onClick={() => handleUpdateUser(user.userId)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => handleDeleteUser(user.userId)}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default Users;
