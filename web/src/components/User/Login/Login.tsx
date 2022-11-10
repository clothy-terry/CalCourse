import { Button, Divider, Form, Input, Drawer } from "antd";
import "./Login.css";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { convertCompilerOptionsFromJson } from "typescript";
import Tutorial from "./Tutorial";
import LoginAPI from "../../../requests/LoginAPI";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  console.log("Login");
  
  const navigate = useNavigate();
  // detect if token is already stored
  // if yes, then navigate to dashboard page

  if (checkValidToken()) {
    navigate("/dashboard");
    console.log("checked");
  }

  const onFinish = (values: any) => {
    console.log("Success:", values, "hi there!");
    //sendEmailCode();
    let email = form.getFieldValue("emailInputField");
    console.log(email);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [isEmailAuthHidden, setEmailAuthHidden] = useState(true);
  const [isOneTapHidden, setOnetapHidden] = useState(true);

  const handleEmailAuth = () => {
    console.log("EmailAuth Clicked");
    setEmailAuthHidden(false);
    setOnetapHidden(true);
  };

  const handleGoogleAuth = () => {
    console.log("GoogleAuth Clicked");
    setOnetapHidden(false);
    setEmailAuthHidden(true);
  };

  const [Aboutopen, setAboutOpen] = useState(false);

  const showAboutDrawer = () => {
    setAboutOpen(true);
  };

  const onAboutClose = () => {
    setAboutOpen(false);
  };

  const [Cookieopen, setCookieOpen] = useState(false);

  const showCookieDrawer = () => {
    setCookieOpen(true);
  };

  const onCookieClose = () => {
    setCookieOpen(false);
  };

  const [Tutorialopen, setTutorialOpen] = useState(false);

  const showTutorialDrawer = () => {
    setTutorialOpen(true);
  };

  const onTutorialClose = () => {
    setTutorialOpen(false);
  };

  const [showSpan, setShowSpan] = useState(false);
  const [isButtonHidden, setButtonHidden] = useState(false);
  const [emailInput, setEmailInput] = useState("?");

  const [form] = Form.useForm();

  function storeEmailInput(event: any) {
    setEmailInput(event.target.value + "@berkeley.edu");
  }

  function sendEmailCode() {
    console.log("Send Email Code");
    setShowSpan(!showSpan);
    setButtonHidden(!isButtonHidden);
    console.log(emailInput);
    LoginAPI.sendVerificationCode(
      emailInput,
      (response: any) => { console.log("Successfully sent") },
      (error: any) => { console.log("Fail") }
    );
    countDown(countDownCurr);
  }

  const countDownInit = 60;
  const [countDownCurr, setCountDownCurr] = useState(countDownInit);

  function countDown(time: number) {
    let intervalId = setInterval(() => {
      setCountDownCurr((prevCount) => prevCount - 1);
      time = time - 1;
      if (time === 0) {
        clearInterval(intervalId);
        stopCount();
      }
    }, 1000);
  }

  const stopCount = () => {
    setShowSpan(false);
    setButtonHidden(false);
    setCountDownCurr(countDownInit);
  };

  
  const onEmailSignIn = () => {
    let codeInput = document
      .getElementById("auth-code-input")
      ?.getAttribute("value");
    let codeReg = new RegExp("^[0-9]{6}$");
    console.log(emailInput, codeInput);
    if (!emailInput) {
      console.log("请先获取验证码");
    } else if (!codeInput) {
      console.log("请填写验证码");
    } else if (!codeReg.test(codeInput)) {
      console.log("验证码格式不正确");
    } else {
      LoginAPI.verifyAuthenticationCode(
        emailInput, 
        codeInput, 
        emailSignInSuccess, 
        (response: any) => { console.log("验证失败，请重试") }
      );
    }
  };

  const emailSignInSuccess = (response: any) => {
    console.log(response);
    saveDataToLocalStorage(emailInput, response["access_token"]);
    console.log("sign in ");
    navigate("/dashboard");
  };

  const oneTapSignInSuccess = () => {
    saveUserTokenTime();
  }

  const saveUserTokenTime = () => {
    let currentTime = new Date();
    let currentTimeList = [
      currentTime.getUTCFullYear(),
      currentTime.getUTCMonth(),
      currentTime.getUTCDate(),
      currentTime.getUTCHours(),
    ];
    localStorage.setItem("user_token_time", JSON.stringify(currentTimeList));
  }

  const saveDataToLocalStorage = (email: string, access_token: string) => {
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_token", access_token);
    saveUserTokenTime();
  };

  function readUserTokenTime() {
    let token_time_data = localStorage.getItem("user_token_time");
    if (token_time_data !== null) {
      return JSON.parse(token_time_data);
    } else {
      return null;
    }
  };

  function checkValidToken() {
    let timeList = readUserTokenTime();
    if (timeList === null) {
      return false;
    }
    let currentTime = new Date();
    // let currentTimeUTC = Data.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), currentTime.getUTCHours());
    let tokenTime = Date.UTC(
      timeList[0],
      timeList[1],
      timeList[2],
      timeList[3],
      0,
      0,
      0
    );
    let diff_ms = currentTime.getTime() - tokenTime;
    // token is valid for 6 hours
    let diff_hours = diff_ms / 1000 / 60 / 60;
    if (diff_hours <= 1) {
      return true;
    }
    return false;
  };



  return (
    <div id="main-container">
      <div id="login-wrapper">
        <h1>Cal Course</h1>
        <div>我们需要验证你的学生身份</div>
        <Button onClick={handleEmailAuth}>邮箱验证码</Button>
        <Button onClick={handleGoogleAuth}>bConnected</Button>

        <div id="email-auth-wrapper" hidden={isEmailAuthHidden}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 1 }}
            wrapperCol={{ span: 6 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item name="emailInputField">
              <Input
                id="email-input"
                placeholder="Oskibear"
                onChange={(event) => storeEmailInput(event)}
              />
              @berkeley.edu
            </Form.Item>
            {showSpan ? <span>{countDownCurr}</span> : null}
            <Button
              type="link"
              hidden={isButtonHidden}
              id="email-code-button"
              onClick={sendEmailCode}
            >
              获取
            </Button>
            <Form.Item
              name="验证码input"
              rules={[{ required: false, message: "请正确输入验证码！" }]}
            >
              <Input id="auth-code-input" placeholder="请输入验证码" />
            </Form.Item>
            <Button type="link" onClick={onEmailSignIn}>
              登录
            </Button>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
          </Form>
        </div>

        <div hidden={isOneTapHidden}>
          <GoogleOAuthProvider clientId="250149314571-jen9j3rq3bsds17t8ot35g4efd66gt54.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                oneTapSignInSuccess();
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
      </div>

      <div id="footer">
        <Button shape="round" onClick={showAboutDrawer}>
          About
        </Button>
        <Drawer
          title="About"
          placement="bottom"
          onClose={onAboutClose}
          open={Aboutopen}
        >
          <p className="about-title">
            <strong>Made with 💙💛💙 by ... </strong>
            <br />
          </p>
          <p>
            <strong>Prototype</strong>
            <br />
            -T.K.-
          </p>
          <p>
            <strong>Front End | 前端</strong>
            <br />
            Ruohan Yan, Yuanhan Li, Ruomu Xu, Charlie Cheng-Jie Ji
          </p>
          <p>
            <strong>Full Stack & Maintenance | 全栈 & 技术维护</strong>
            <br />
            Huanzhi Mao
          </p>
          <p>
            <strong>Special Thanks | 特别鸣谢</strong>
            <br />
            Shufan Li, Uncertainty. CC
          </p>
          <p>
            <strong>Contact Us | 联系我们</strong>
            <br />
            <a href="mailto:huanzhimao@berkeley.edu">huanzhimao@berkeley.edu</a>
          </p>
        </Drawer>

        <Button shape="round" onClick={showCookieDrawer}>
          🍪
        </Button>

        <Drawer
          title="Cookie"
          placement="bottom"
          onClose={onCookieClose}
          open={Cookieopen}
        >
          <div>
            <h2>
              By using and/or continuing to use our services, you agree to the
              following policies, terms, and conditions.
            </h2>
            <h3>Cookies Policy</h3>
            <p>
              This Cookies Policy explains what Cookies are and how We use them.
              You should read this policy so You can understand what type of
              cookies We use, or the information We collect using Cookies and
              how that information is used. This Cookies Policy has been created
              with the help of the{" "}
              <a
                href="https://www.privacypolicies.com/cookies-policy-generator/"
                target="_blank"
              >
                Cookies Policy Generator
              </a>
              .
            </p>
            <p>
              Cookies do not typically contain any information that personally
              identifies a user, but personal information that we store about
              You may be linked to the information stored in and obtained from
              Cookies. For further information on how We use, store and keep
              your personal data secure, see our Privacy Policy.
            </p>
            <p>
              We do not store sensitive personal information, such as mailing
              addresses, account passwords, etc. in the Cookies We use.
            </p>
            <h3>Interpretation and Definitions</h3>
            <h3>Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
            <h3>Definitions</h3>
            <p>For the purposes of this Cookies Policy:</p>
            <ul>
              <li>
                <strong>Company</strong> (referred to as either &quot;the
                Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;
                in this Cookies Policy) refers to Cal Course Development Team,
                Berkeley, CA 94720.
              </li>
              <li>
                <strong>Cookies</strong> means small files that are placed on
                Your computer, mobile device or any other device by a website,
                containing details of your browsing history on that website
                among its many uses.
              </li>
              <li>
                <strong>Website</strong> refers to Cal Course, accessible from{" "}
                <a
                  href="http://www.calcourse.org"
                  rel="external nofollow noopener"
                  target="_blank"
                >
                  http://www.calcourse.org
                </a>
              </li>
              <li>
                <strong>You</strong> means the individual accessing or using the
                Website, or a company, or any legal entity on behalf of which
                such individual is accessing or using the Website, as
                applicable.
              </li>
            </ul>
            <h3>The use of the Cookies</h3>
            <h3>Type of Cookies We Use</h3>
            <p>
              Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
              Cookies. Persistent Cookies remain on your personal computer or
              mobile device when You go offline, while Session Cookies are
              deleted as soon as You close your web browser.
            </p>
            <p>
              We use both session and persistent Cookies for the purposes set
              out below:
            </p>
            <ul>
              <li>
                <p>
                  <strong>Necessary / Essential Cookies</strong>
                </p>
                <p>Type: Session Cookies</p>
                <p>Administered by: Us</p>
                <p>
                  Purpose: These Cookies are essential to provide You with
                  services available through the Website and to enable You to
                  use some of its features. They help to authenticate users and
                  prevent fraudulent use of user accounts. Without these
                  Cookies, the services that You have asked for cannot be
                  provided, and We only use these Cookies to provide You with
                  those services.
                </p>
              </li>
              <li>
                <p>
                  <strong>Functionality Cookies</strong>
                </p>
                <p>Type: Persistent Cookies</p>
                <p>Administered by: Us</p>
                <p>
                  Purpose: These Cookies allow us to remember choices You make
                  when You use the Website, such as remembering your login
                  details or language preference. The purpose of these Cookies
                  is to provide You with a more personal experience and to avoid
                  You having to re-enter your preferences every time You use the
                  Website.
                </p>
              </li>
            </ul>
            <h3>Your Choices Regarding Cookies</h3>
            <p>
              If You prefer to avoid the use of Cookies on the Website, first
              You must disable the use of Cookies in your browser and then
              delete the Cookies saved in your browser associated with this
              website. You may use this option for preventing the use of Cookies
              at any time.
            </p>
            <p>
              If You do not accept Our Cookies, You may experience some
              inconvenience in your use of the Website and some features may not
              function properly.
            </p>
            <p>
              If You'd like to delete Cookies or instruct your web browser to
              delete or refuse Cookies, please visit the help pages of your web
              browser.
            </p>
            <ul>
              <li>
                <p>
                  For the Chrome web browser, please visit this page from
                  Google:{" "}
                  <a
                    href="https://support.google.com/accounts/answer/32050"
                    rel="external nofollow noopener"
                    target="_blank"
                  >
                    https://support.google.com/accounts/answer/32050
                  </a>
                </p>
              </li>
              <li>
                <p>
                  For the Internet Explorer web browser, please visit this page
                  from Microsoft:{" "}
                  <a
                    href="http://support.microsoft.com/kb/278835"
                    rel="external nofollow noopener"
                    target="_blank"
                  >
                    http://support.microsoft.com/kb/278835
                  </a>
                </p>
              </li>
              <li>
                <p>
                  For the Firefox web browser, please visit this page from
                  Mozilla:{" "}
                  <a
                    href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
                    rel="external nofollow noopener"
                    target="_blank"
                  >
                    https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
                  </a>
                </p>
              </li>
              <li>
                <p>
                  For the Safari web browser, please visit this page from Apple:{" "}
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    rel="external nofollow noopener"
                    target="_blank"
                  >
                    https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                  </a>
                </p>
              </li>
            </ul>
            <p>
              For any other web browser, please visit your web browser's
              official web pages.
            </p>
            <h3>More Information about Cookies</h3>
            <p>
              You can learn more about cookies:{" "}
              <a
                href="https://www.privacypolicies.com/blog/cookies/"
                target="_blank"
              >
                What Are Cookies?
              </a>
              .
            </p>
            <h3>Contact Us</h3>
            <p>
              If you have any questions about this Cookies Policy, You can
              contact us:
            </p>
            <ul>
              <li>By email: calcourse@outlook.com</li>
            </ul>

            <h2>Privacy Policy</h2>
            <p>Last updated: April 21, 2021</p>
            <p>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </p>
            <p>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy. This Privacy
              Policy has been created with the help of the{" "}
              <a
                href="https://www.privacypolicies.com/privacy-policy-generator/"
                target="_blank"
              >
                Privacy Policy Generator
              </a>
              .
            </p>
            <h3>Interpretation and Definitions</h3>
            <h3>Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
            <h3>Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul>
              <li>
                <p>
                  <strong>Account</strong> means a unique account created for
                  You to access our Service or parts of our Service.
                </p>
              </li>
              <li>
                <p>
                  <strong>Company</strong> (referred to as either &quot;the
                  Company&quot;, &quot;We&quot;, &quot;Us&quot; or
                  &quot;Our&quot; in this Agreement) refers to Cal Course
                  Development Team, Berkeley, CA 94720.
                </p>
              </li>
              <li>
                <p>
                  <strong>Cookies</strong> are small files that are placed on
                  Your computer, mobile device or any other device by a website,
                  containing the details of Your browsing history on that
                  website among its many uses.
                </p>
              </li>
              <li>
                <p>
                  <strong>Country</strong> refers to: California, United States
                </p>
              </li>
              <li>
                <p>
                  <strong>Device</strong> means any device that can access the
                  Service such as a computer, a cellphone or a digital tablet.
                </p>
              </li>
              <li>
                <p>
                  <strong>Personal Data</strong> is any information that relates
                  to an identified or identifiable individual.
                </p>
              </li>
              <li>
                <p>
                  <strong>Service</strong> refers to the Website.
                </p>
              </li>
              <li>
                <p>
                  <strong>Service Provider</strong> means any natural or legal
                  person who processes the data on behalf of the Company. It
                  refers to third-party companies or individuals employed by the
                  Company to facilitate the Service, to provide the Service on
                  behalf of the Company, to perform services related to the
                  Service or to assist the Company in analyzing how the Service
                  is used.
                </p>
              </li>
              <li>
                <p>
                  <strong>Third-party Social Media Service</strong> refers to
                  any website or any social network website through which a User
                  can log in or create an account to use the Service.
                </p>
              </li>
              <li>
                <p>
                  <strong>Usage Data</strong> refers to data collected
                  automatically, either generated by the use of the Service or
                  from the Service infrastructure itself (for example, the
                  duration of a page visit).
                </p>
              </li>
              <li>
                <p>
                  <strong>Website</strong> refers to Cal Course, accessible from{" "}
                  <a
                    href="http://www.calcourse.org"
                    rel="external nofollow noopener"
                    target="_blank"
                  >
                    http://www.calcourse.org
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <strong>You</strong> means the individual accessing or using
                  the Service, or the company, or other legal entity on behalf
                  of which such individual is accessing or using the Service, as
                  applicable.
                </p>
              </li>
            </ul>
            <h3>Collecting and Using Your Personal Data</h3>
            <h3>Types of Data Collected</h3>
            <h3>Personal Data</h3>
            <p>
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Personally identifiable information may include, but
              is not limited to:
            </p>
            <ul>
              <li>
                <p>Email address</p>
              </li>
              <li>
                <p>Usage Data</p>
              </li>
            </ul>
            <h3>Usage Data</h3>
            <p>Usage Data is collected automatically when using the Service.</p>
            <p>
              Usage Data may include information such as Your Device's Internet
              Protocol address (e.g. IP address), browser type, browser version,
              the pages of our Service that You visit, the time and date of Your
              visit, the time spent on those pages, unique device identifiers
              and other diagnostic data.
            </p>
            <p>
              When You access the Service by or through a mobile device, We may
              collect certain information automatically, including, but not
              limited to, the type of mobile device You use, Your mobile device
              unique ID, the IP address of Your mobile device, Your mobile
              operating system, the type of mobile Internet browser You use,
              unique device identifiers and other diagnostic data.
            </p>
            <p>
              We may also collect information that Your browser sends whenever
              You visit our Service or when You access the Service by or through
              a mobile device.
            </p>
            <h3>Tracking Technologies and Cookies</h3>
            <p>
              We use Cookies and similar tracking technologies to track the
              activity on Our Service and store certain information. Tracking
              technologies used are beacons, tags, and scripts to collect and
              track information and to improve and analyze Our Service. The
              technologies We use may include:
            </p>
            <ul>
              <li>
                <strong>Cookies or Browser Cookies.</strong> A cookie is a small
                file placed on Your Device. You can instruct Your browser to
                refuse all Cookies or to indicate when a Cookie is being sent.
                However, if You do not accept Cookies, You may not be able to
                use some parts of our Service. Unless you have adjusted Your
                browser setting so that it will refuse Cookies, our Service may
                use Cookies.
              </li>
              <li>
                <strong>Flash Cookies.</strong> Certain features of our Service
                may use local stored objects (or Flash Cookies) to collect and
                store information about Your preferences or Your activity on our
                Service. Flash Cookies are not managed by the same browser
                settings as those used for Browser Cookies. For more information
                on how You can delete Flash Cookies, please read &quot;Where can
                I change the settings for disabling, or deleting local shared
                objects?&quot; available at{" "}
                <a
                  href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_"
                  rel="external nofollow noopener"
                  target="_blank"
                >
                  https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_
                </a>
              </li>
              <li>
                <strong>Web Beacons.</strong> Certain sections of our Service
                and our emails may contain small electronic files known as web
                beacons (also referred to as clear gifs, pixel tags, and
                single-pixel gifs) that permit the Company, for example, to
                count users who have visited those pages or opened an email and
                for other related website statistics (for example, recording the
                popularity of a certain section and verifying system and server
                integrity).
              </li>
            </ul>
            <p>
              Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
              Cookies. Persistent Cookies remain on Your personal computer or
              mobile device when You go offline, while Session Cookies are
              deleted as soon as You close Your web browser. Learn more about
              cookies:{" "}
              <a
                href="https://www.privacypolicies.com/blog/cookies/"
                target="_blank"
              >
                What Are Cookies?
              </a>
              .
            </p>
            <p>
              We use both Session and Persistent Cookies for the purposes set
              out below:
            </p>
            <ul>
              <li>
                <p>
                  <strong>Necessary / Essential Cookies</strong>
                </p>
                <p>Type: Session Cookies</p>
                <p>Administered by: Us</p>
                <p>
                  Purpose: These Cookies are essential to provide You with
                  services available through the Website and to enable You to
                  use some of its features. They help to authenticate users and
                  prevent fraudulent use of user accounts. Without these
                  Cookies, the services that You have asked for cannot be
                  provided, and We only use these Cookies to provide You with
                  those services.
                </p>
              </li>
              <li>
                <p>
                  <strong>Cookies Policy / Notice Acceptance Cookies</strong>
                </p>
                <p>Type: Persistent Cookies</p>
                <p>Administered by: Us</p>
                <p>
                  Purpose: These Cookies identify if users have accepted the use
                  of cookies on the Website.
                </p>
              </li>
              <li>
                <p>
                  <strong>Functionality Cookies</strong>
                </p>
                <p>Type: Persistent Cookies</p>
                <p>Administered by: Us</p>
                <p>
                  Purpose: These Cookies allow us to remember choices You make
                  when You use the Website, such as remembering your login
                  details or language preference. The purpose of these Cookies
                  is to provide You with a more personal experience and to avoid
                  You having to re-enter your preferences every time You use the
                  Website.
                </p>
              </li>
            </ul>
            <p>
              For more information about the cookies we use and your choices
              regarding cookies, please visit our Cookies Policy or the Cookies
              section of our Privacy Policy.
            </p>
            <h3>Use of Your Personal Data</h3>
            <p>The Company may use Personal Data for the following purposes:</p>
            <ul>
              <li>
                <p>
                  <strong>To provide and maintain our Service</strong>,
                  including to monitor the usage of our Service.
                </p>
              </li>
              <li>
                <p>
                  <strong>To manage Your Account:</strong> to manage Your
                  registration as a user of the Service. The Personal Data You
                  provide can give You access to different functionalities of
                  the Service that are available to You as a registered user.
                </p>
              </li>
              <li>
                <p>
                  <strong>For the performance of a contract:</strong> the
                  development, compliance and undertaking of the purchase
                  contract for the products, items or services You have
                  purchased or of any other contract with Us through the
                  Service.
                </p>
              </li>
              <li>
                <p>
                  <strong>To contact You:</strong> To contact You by email,
                  telephone calls, SMS, or other equivalent forms of electronic
                  communication, such as a mobile application's push
                  notifications regarding updates or informative communications
                  related to the functionalities, products or contracted
                  services, including the security updates, when necessary or
                  reasonable for their implementation.
                </p>
              </li>
              <li>
                <p>
                  <strong>To provide You</strong> with news, special offers and
                  general information about other goods, services and events
                  which we offer that are similar to those that you have already
                  purchased or enquired about unless You have opted not to
                  receive such information.
                </p>
              </li>
              <li>
                <p>
                  <strong>To manage Your requests:</strong> To attend and manage
                  Your requests to Us.
                </p>
              </li>
              <li>
                <p>
                  <strong>For business transfers:</strong> We may use Your
                  information to evaluate or conduct a merger, divestiture,
                  restructuring, reorganization, dissolution, or other sale or
                  transfer of some or all of Our assets, whether as a going
                  concern or as part of bankruptcy, liquidation, or similar
                  proceeding, in which Personal Data held by Us about our
                  Service users is among the assets transferred.
                </p>
              </li>
              <li>
                <p>
                  <strong>For other purposes</strong>: We may use Your
                  information for other purposes, such as data analysis,
                  identifying usage trends, determining the effectiveness of our
                  promotional campaigns and to evaluate and improve our Service,
                  products, services, marketing and your experience.
                </p>
              </li>
            </ul>
            <p>
              We may share Your personal information in the following
              situations:
            </p>
            <ul>
              <li>
                <strong>With Service Providers:</strong> We may share Your
                personal information with Service Providers to monitor and
                analyze the use of our Service, to contact You.
              </li>
              <li>
                <strong>For business transfers:</strong> We may share or
                transfer Your personal information in connection with, or during
                negotiations of, any merger, sale of Company assets, financing,
                or acquisition of all or a portion of Our business to another
                company.
              </li>
              <li>
                <strong>With Affiliates:</strong> We may share Your information
                with Our affiliates, in which case we will require those
                affiliates to honor this Privacy Policy. Affiliates include Our
                parent company and any other subsidiaries, joint venture
                partners or other companies that We control or that are under
                common control with Us.
              </li>
              <li>
                <strong>With business partners:</strong> We may share Your
                information with Our business partners to offer You certain
                products, services or promotions.
              </li>
              <li>
                <strong>With other users:</strong> when You share personal
                information or otherwise interact in the public areas with other
                users, such information may be viewed by all users and may be
                publicly distributed outside. If You interact with other users
                or register through a Third-Party Social Media Service, Your
                contacts on the Third-Party Social Media Service may see Your
                name, profile, pictures and description of Your activity.
                Similarly, other users will be able to view descriptions of Your
                activity, communicate with You and view Your profile.
              </li>
              <li>
                <strong>With Your consent</strong>: We may disclose Your
                personal information for any other purpose with Your consent.
              </li>
            </ul>
            <h3>Retention of Your Personal Data</h3>
            <p>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies.
            </p>
            <p>
              The Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods.
            </p>
            <h3>Transfer of Your Personal Data</h3>
            <p>
              Your information, including Personal Data, is processed at the
              Company's operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country or other
              governmental jurisdiction where the data protection laws may
              differ than those from Your jurisdiction.
            </p>
            <p>
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.
            </p>
            <p>
              The Company will take all steps reasonably necessary to ensure
              that Your data is treated securely and in accordance with this
              Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of Your data and other
              personal information.
            </p>
            <h3>Disclosure of Your Personal Data</h3>
            <h3>Business Transactions</h3>
            <p>
              If the Company is involved in a merger, acquisition or asset sale,
              Your Personal Data may be transferred. We will provide notice
              before Your Personal Data is transferred and becomes subject to a
              different Privacy Policy.
            </p>
            <h3>Law enforcement</h3>
            <p>
              Under certain circumstances, the Company may be required to
              disclose Your Personal Data if required to do so by law or in
              response to valid requests by public authorities (e.g. a court or
              a government agency).
            </p>
            <h3>Other legal requirements</h3>
            <p>
              The Company may disclose Your Personal Data in the good faith
              belief that such action is necessary to:
            </p>
            <ul>
              <li>Comply with a legal obligation</li>
              <li>Protect and defend the rights or property of the Company</li>
              <li>
                Prevent or investigate possible wrongdoing in connection with
                the Service
              </li>
              <li>
                Protect the personal safety of Users of the Service or the
                public
              </li>
              <li>Protect against legal liability</li>
            </ul>
            <h3>Security of Your Personal Data</h3>
            <p>
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </p>
            <h3>Children's Privacy</h3>
            <p>
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from anyone
              under the age of 13. If You are a parent or guardian and You are
              aware that Your child has provided Us with Personal Data, please
              contact Us. If We become aware that We have collected Personal
              Data from anyone under the age of 13 without verification of
              parental consent, We take steps to remove that information from
              Our servers.
            </p>
            <p>
              If We need to rely on consent as a legal basis for processing Your
              information and Your country requires consent from a parent, We
              may require Your parent's consent before We collect and use that
              information.
            </p>
            <h3>Links to Other Websites</h3>
            <p>
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third party link, You will be
              directed to that third party's site. We strongly advise You to
              review the Privacy Policy of every site You visit.
            </p>
            <p>
              We have no control over and assume no responsibility for the
              content, privacy policies or practices of any third party sites or
              services.
            </p>
            <h3>Changes to this Privacy Policy</h3>
            <p>
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
            </p>
            <p>
              We will let You know via email and/or a prominent notice on Our
              Service, prior to the change becoming effective and update the
              &quot;Last updated&quot; date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
            <h3>Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, You can
              contact us:
            </p>
            <ul>
              <li>By email: calcourse.com@gmail.com</li>
            </ul>
          </div>
        </Drawer>

        <Button shape="round" onClick={showTutorialDrawer}>
          ？
        </Button>
        <Drawer
          title="Tutorial"
          placement="bottom"
          onClose={onTutorialClose}
          open={Tutorialopen}
        >
          <Tutorial></Tutorial>
        </Drawer>
      </div>
    </div>
  );
};
export default Login;
