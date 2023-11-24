import { getAuthenticatedUser } from "../../services/auths";
import UserSevice from "../../services/userService";
import { useEffect, useState } from "react";
import "./googlePage.css";
import GoogleCalendar from "./GoogleCalendar";
const GooglePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      UserSevice.getUserWithGoogle()
        .then((user) => {
          setUserInfo(user);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération de l'utilisateur:",
            error
          );
        });
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="user-info-container">
        <h1>User Information</h1>
        <div className="user-info">
          <div className="user-info-item">
            <strong>Email:</strong> {userInfo.email}
          </div>
          <div className="user-info-item">
            <strong>Name:</strong> {userInfo.name}
          </div>
          <div className="user-info-item">
            <strong>Picture:</strong>{" "}
            <img src={userInfo.picture} alt="User Profile" />
          </div>
          <div className="user-info-item">
            <strong>Id :</strong> {userInfo.id}
          </div>
        </div>
      </div>

      <GoogleCalendar />
    </>
  );
};

export default GooglePage;
