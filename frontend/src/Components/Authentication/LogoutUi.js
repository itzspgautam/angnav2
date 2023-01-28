import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/UserActions";

const LogoutUi = (props) => {
  const Dispatch = useDispatch();
  const logoutHandle = async () => {
    Dispatch(logout());
  };

  return <span onClick={logoutHandle}>{props.children}</span>;
};

export default LogoutUi;
