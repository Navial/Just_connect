import { React } from "react";
import {  UserOutlined } from "@ant-design/icons";
import {  Card ,Form, Input } from "antd";
import { Link } from "react-router-dom";

import GithubBtn from "../Login/GithubButton";
import TwitchButton from "./TwitchButton";
import GoogleButton from "../Google/GoogleButton";
import DiscordButton from "./DiscordButton";

const Login = () => {


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
        >
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
