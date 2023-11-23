import { getAuthenticatedUser } from "../../services/auths";
import UserSevice  from "../../services/userService";
import { useEffect, useState } from "react";
import "./googlePage.css";
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
    // L'utilisateur n'a pas encore été récupéré
    return <div>Loading...</div>;
  }

  console.log({ userInfo });
  return (
    <div className="user-info-container">
      <h1>User Information</h1>
      <div className="user-info">
        <div className="user-info-item">
          <strong>Email:</strong> {userInfo.email}
        </div>
        <div className="user-info-item">
          <strong>Email Verified:</strong>{" "}
          {userInfo.email_verified.toString() ? "verifié" : "non verifié"}
        </div>
        <div className="user-info-item">
          <strong>Name:</strong> {userInfo.name}
        </div>
        <div className="user-info-item">
          <strong>Picture:</strong>{" "}
          <img src={userInfo.picture} alt="User Profile" />
        </div>
        <div className="user-info-item">
          <strong>Sub (id google):</strong> {userInfo.sub}
        </div>
      </div>
    </div>
  );
};

export default GooglePage;
