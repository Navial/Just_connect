import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    window.location.reload();
  };
  return (
    <>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#5d6570",
          color: "white",
          padding: "5px 10px",
          margin: "1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          boxShadow: "0 2px 2px rgba(0,0,0,0.2)",
          transition: "background-color 0.3s",
        }}
      >
        Déconnexion
      </button>
    </>
  );
};

export default LogoutButton;
