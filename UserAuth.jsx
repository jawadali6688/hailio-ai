import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
export default function UserAuth({ children, authentication = true }) {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const [loader, setLoader] = useState(true);
  const user = useSelector((state) => state.auth.userData);
  const authStatus = user?.accountType
  useEffect(() => {
    if (authStatus === ("user") && authentication === false) {
        navigate(pathname)
    }
    else {
        navigate("/login")
    }
    setLoader(false);
  }, [authStatus, pathname]);
  return loader ? (<span className=" "></span>) : <>{children}</>;
}
