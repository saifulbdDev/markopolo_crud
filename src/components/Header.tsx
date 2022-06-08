/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { userLogin, userLogOut } from "../store/action/userAction";
function Header() {
  const dispatch = useDispatch();
  const user: any = useSelector(
    (state: any) => state?.users?.user,
    shallowEqual
  );
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  // const [ismenu, setIsmenu] = useState(true)

  const logOut = () => {
    dispatch(userLogOut() as any);

    localStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {
   const user = localStorage.getItem('user')
   console.log(user)
   if(user){
    dispatch(userLogin(user) as any);
   }
  }, []);
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" width="40" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/post-list"
                    >
                      Post List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      onClick={logOut}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
