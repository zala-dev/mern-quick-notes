import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utils/user-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logout();
    setUser(null);
  }
  return (
    <nav>
      <Link to="/notes">Notes</Link>
      &nbsp; | &nbsp;
      <Link to="/notes/new">New Note</Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;{" "}
      <Link to="/" onClick={handleLogOut}>
        Log Out{" "}
      </Link>
    </nav>
  );
}
