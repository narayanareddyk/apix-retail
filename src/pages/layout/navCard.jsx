import React, { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function NavCard() {
  return (
    <>
      <NavLink className="nav-card" to="/">
        <div className="image-display">
          <img />
        </div>
        <div className="content-display">
          <h5>Quick Transfer</h5>
          <p>View Statement Details and download the statements</p>
        </div>
      </NavLink>
    </>
  );
}
