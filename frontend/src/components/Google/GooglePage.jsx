import { getAuthenticatedUser } from "../../services/auths";
import "./googlePage.css";
const GooglePage = () => {
  const userInfo = getAuthenticatedUser();
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
