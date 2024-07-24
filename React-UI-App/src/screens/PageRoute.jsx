import React from "react";
import { useHistory } from "react-router-dom";
function PageRoute({ children, routes, url }) {
  const his = useHistory();
  const isLogin = localStorage.getItem("isLogin");
  //   const token = localStorage.getItem("token");
  if (!isLogin) {
    his.push("/template/my-task/react/sign-in");
  }
  const isThere = routes?.find((i) => i?.route === url);
  if (!isThere) {
    his.push("/template/my-task/react/page-not-found");
  } else {
    return children;
  }
}

export default PageRoute;
