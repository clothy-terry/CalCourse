import { Button, Divider, Form, Input, Drawer} from "antd";
import "./Login.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import Tutorial from "./Tutorial";
import LoginAPI from "../../../requests/LoginAPI";
import About from "./About";
import Cookie from "./Cookie";
import {Radio} from "antd";
import React from 'react';
import type { RadioChangeEvent } from 'antd';

const Login = () => {
  console.log("Login");

  const onFinish = (values: any) => {
    console.log('Success:', values, "hi there!");
    let email = form.getFieldValue("emailInputField")
    console.log(email);
  };

  const[isEmailAuthHidden, setEmailAuthHidden] = useState(true);
  const[isOneTapHidden, setOnetapHidden] = useState(true);
  const[cardCoordinatePoint, setCardCoordinatePoint] = useState("flex absolute top-[50px] left-[0px] box-border h-[10px] w-[400px] p-4 border-0 ");

  const handleEmailAuth = () => {
    console.log('EmailAuth Clicked');
    setEmailAuthHidden(false);
    setOnetapHidden(true);
    setCardCoordinatePoint("flex absolute top-[0px] left-[0px] box-border h-[10px] w-[400px] p-4 border-0 ")
  }

  const handleGoogleAuth = () => {
    console.log('GoogleAuth Clicked');
    setOnetapHidden(false);
    setEmailAuthHidden(true);
    setCardCoordinatePoint("flex absolute top-[10px] left-[0px] box-border h-[10px] w-[400px] p-4 border-0 ")
  }

  const [cookieHidden, setCookie] = useState(true);

  const handleCookie = () => {
    setCookie(!cookieHidden);
  };

  const [aboutHidden, setAbout] = useState(true);

  const handleAbout = () => {
    setAbout(!aboutHidden);
  };

  const [tutorialHidden, setTutorial] = useState(true);

  const handleTutorial = () => {
    setTutorial(!tutorialHidden);
  };


  const [showSpan, setShowSpan] = useState(false);
  const [isButtonHidden, setButtonHidden] = useState(false)
  const [emailInput, setEmailInput] = useState("?");

  const[form] = Form.useForm();

  function storeEmailInput(event:any) {
    setEmailInput(event.target.value + "@berkeley.edu")
  }


  function sendEmailCode() {
    console.log('Send Email Code');
    setShowSpan(!showSpan)
    setButtonHidden(!isButtonHidden)
    console.log(emailInput);
    LoginAPI.sendVerificationCode(emailInput, ()=>console.log("Successfully sent"), ()=>console.log("Fail"))
    countDown(countDownCurr);
  }


  const countDownInit = 2
  const [countDownCurr, setCountDownCurr] = useState(countDownInit)

  function countDown(time: number) {
    let intervalId = setInterval(() => {
      setCountDownCurr(prevCount => prevCount - 1);
      time = time - 1;
      if (time === 0) {
        clearInterval(intervalId)
        stopCount()
      }
  }, 1000)
  }

  const stopCount = () => {
    setShowSpan(false)
    setButtonHidden(false)
    setCountDownCurr(countDownInit)
  }

  const emailSignInSuccess = () => {
    console.log("sign in ")
    window.open("/dashboard"); 
  }


  const onEmailSignIn = () => {
    let codeInput = document.getElementById("auth-code-input")?.getAttribute('value')
    let codeReg = new RegExp("^[0-9]{6}$");
    console.log(emailInput, codeInput)
    if (!emailInput) {
      console.log("请先获取验证码");
    } else if (!codeInput) {
      console.log("请填写验证码");
    } else if (!codeReg.test(codeInput)) {
      console.log("验证码格式不正确");
    } else {
      LoginAPI.verifyAuthenticationCode(emailInput, codeInput, emailSignInSuccess, ()=> console.log("验证失败，请重试"))
    }
  }

  const onSelectLoginOption = ({target:{value}}: RadioChangeEvent) => {
    if (value == "bConnected-option") {
      handleGoogleAuth();
    } else {
      handleEmailAuth();
    }
  }

  return (
    <div  id="main-container">
      <div className="text-white font-bold text-5xl absolute top-[100px] left-1/4" id="title">Cal Course</div>
      <div id="login-wrapper">
        <div className={cardCoordinatePoint}>
        <div className="absolute top-[50px] left-[105px] text-white font-bold text-2xl">我们需要验证你的学生身份</div>
          <div className="absolute top-[110px] left-[100px]" id="auth-option-wrapper">
            <label id="auth-option"  onClick={handleEmailAuth}>邮箱验证码</label>
            <label id="auth-option"  onClick={handleGoogleAuth}>bConnected</label>
        </div>
          </div>
          
      <div className="relative top-[100px] left-[90px]" 
      id="email-auth-wrapper" hidden={isEmailAuthHidden}>
      <Form form={form} name="basic" labelCol={{ span: 1 }} wrapperCol={{ span: 6 }} 
      onFinish={onFinish} autoComplete="off">
      <Form.Item name="emailInputField">
        <div className="flex box-border h-[35px] w-[318px] p-0 border-0">
        <input id="email-input" placeholder="oskibear" 
        onChange={event=>storeEmailInput(event)}/>
        <span className="text-lg" id="email-suffix">@berkeley.edu</span>
        {showSpan ? <span id="countdown">{countDownCurr}</span> :null}
        <a hidden={isButtonHidden} id="email-code-button" 
        onClick={sendEmailCode}>获取</a>
        </div>
        </Form.Item>  
      <Form.Item
        name="验证码input"
        rules={[{ required: false, message: '请正确输入验证码！' }]}
      >
        <div className="flex box-border h-[35px] w-[318px] p-0 border-0">
        <input id="email-code-input" placeholder="请输入验证码"/>
        <a id="email-login-button" onClick={onEmailSignIn}>登录</a>
        </div>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      </Form.Item>
    </Form>
      </div>
      

    <div className="absolute top-[180px] left-[135px] box-border h-[20px] w-[400px] p-4 border-0" 
    hidden={isOneTapHidden}>
    <GoogleOAuthProvider clientId=
      "250149314571-jen9j3rq3bsds17t8ot35g4efd66gt54.apps.googleusercontent.com">
        <GoogleLogin 
  onSuccess={(credentialResponse: any) => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/>
</GoogleOAuthProvider>
    </div>  
</div>

<div
id="footer">
  <button className="button small-button" onClick={handleAbout}>
    <div>👥</div>
  </button>
  <div id="about-container" hidden={aboutHidden}>
    <div id="about-wrapper"><About></About></div>
    <button className="button small-button" onClick={handleAbout}><div>✔︎</div></button>
  </div>

  <button className="button small-button" onClick={handleCookie}>
    <div>🍪</div>
  </button>
  <div id="cookies-container" hidden={cookieHidden}>
    <div id="cookie-wrapper"><Cookie></Cookie></div>
    <button className="button small-button" onClick={handleCookie}><div>✔︎</div></button>
  </div>
  
  <button className="button small-button" onClick={handleTutorial}>
    <div>?</div>
  </button>
  <div id="tutorial-container" hidden={tutorialHidden}>
    <div id="tutorial-wrapper"><Tutorial></Tutorial></div>
    <button className="button small-button" onClick={handleTutorial}><div>✔︎</div></button>
  </div>
</div>   
    </div>
  );
};
export default Login;