import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utils/user-service";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logout();
    setUser(null);
  }
  return (
    <nav className="nav">
      <Link className="nav-item" to="/notes">
        Notes
      </Link>
      {/* &nbsp; | &nbsp; */}
      {/* <Link to="/notes/new">New Note</Link> */}
      &nbsp; | &nbsp;
      <span className="nav-greet">Welcome, {user.name}</span>
      &nbsp;&nbsp;{" "}
      <Link className="nav-item" to="/" onClick={handleLogOut}>
        Log Out{" "}
      </Link>
    </nav>
  );
}
