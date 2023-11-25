import { React } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

import GithubBtn from "../Login/GithubButton";
import TwitchButton from "./TwitchButton";
import GoogleButton from "../Google/GoogleButton";
import DiscordButton from "./DiscordButton";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
            Log in
          </Form.Item>
          Ou <Link to="/register"> s'inscrire maintenant ! </Link>
          <Form.Item>
            <GoogleButton />
          </Form.Item>
          <Form.Item>
            <DiscordButton></DiscordButton>
          </Form.Item>
          <Form.Item>
            <TwitchButton />
          </Form.Item>
          <Form.Item>
            <GithubBtn />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
