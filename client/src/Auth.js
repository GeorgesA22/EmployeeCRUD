import React from "react";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
const Auth = ({ authRoute }) => {
  return (
    <>
      {authRoute === "main" && <Main />}
      {authRoute === "register" && <Registration />}
    </>
  );
};

export default Auth;