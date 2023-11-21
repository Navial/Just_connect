import React, { useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { MsalProvider } from "@azure/msal-react";
import msalConfig from "../../msalConfig";
import AzureButton from "../Azure/AzureButton";

import { Context as UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { PublicClientApplication } from "@azure/msal-browser";

const pca_Azure = new PublicClientApplication(msalConfig);

const Login = () => {
  const { logged, connect } = useContext(UserContext);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleDiscordLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/discord/login");

      connect("discord");
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Connexion">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nom d'utilisateur"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mot de passe"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Se souvenir de moi</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Ou <Link to="/register"> s'inscrire maintenant ! </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              style={{
                backgroundColor: "#7289da",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={handleDiscordLogin}
            >
              Connect with Discord
            </Button>
          </Form.Item>
          <Form.Item>
            <MsalProvider instance={pca_Azure}>
              <AzureButton />
            </MsalProvider>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
