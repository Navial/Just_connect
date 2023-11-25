import UserService from "../../services/userService";
import { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
const { Meta } = Card;
const GoogleUserInformation = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      UserService.getUserWithGoogle()
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
    <div style={{marginTop: '10px'}} >
      <h1 style={{textAlign: 'center'}}>Information de l'utilisateur</h1>
      <Card
        style={{
          width: 500,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        
      >
        <Meta
          avatar={
            <Avatar src={userInfo.picture} icon={<UserOutlined />} size={64} />
          }
          title={userInfo.name}
          description={
            <>
              <p>
                <strong>Email:</strong> {userInfo.email}
              </p>
              <p>
                <strong>Id :</strong> {userInfo.id}
              </p>
            </>
          }
        />
      </Card>
    </div>
  );
};

export default GoogleUserInformation;
