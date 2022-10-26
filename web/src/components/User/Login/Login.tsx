import { Button } from "antd";
import "./Login.css";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from "react-dom/client";
import { GoogleLogin } from '@react-oauth/google';
import React from 'react';


const handleEmailAuth = () => {
  console.log('EmailAuth Clicked');
}

const handleGoogleAuth = () => {
  console.log('GoogleAuth Clicked');
  <div>
    <h1>Hellow</h1>
  </div>
          
}

const Login = () => {
  console.log("Login");
  return (
    <div id="main-container">
      <div id="login-wrapper" className="hidden">
        <h1>Cal Course</h1>
      <div>我们需要验证你的学生身份</div>
      <Button onClick={handleEmailAuth}>邮箱验证码</Button> <Button onClick={handleGoogleAuth}>bConnected</Button>

      <GoogleOAuthProvider clientId=
      "250149314571-jen9j3rq3bsds17t8ot35g4efd66gt54.apps.googleusercontent.com">
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/></GoogleOAuthProvider></div>
<div id="footer">
  <Button shape="round">About</Button>
  <Button shape="round">🍪</Button>
  <Button shape="round">？</Button>
</div>
    </div>
  );
};
export default Login;