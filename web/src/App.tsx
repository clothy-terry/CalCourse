import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import Login from "./components/User/Login/Login";
import UserPortal from "./components/User/UserPortal/UserPortal";
import CodingLounge from "./components/CodingLounge/CodingLounge";
import Dashboard from "./components/Dashboard/Dashboard";
import AcademicPanel from "./components/AcademicPanel/AcademicPanel";
import EventOverview from "./components/Event/EventOverview";
import Test from "./test";
import { Cache } from "aws-amplify";

import { Amplify, Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { confirmSignUp, signUp } from "./components/User/Signup/Signup";

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: "us-west-1",

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: "us-west-1_MqEcOiLWm",

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: "3nqs4ftu3f97bgb5mhval5ladv",

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        // mandatorySignIn: true,

        aws_cognito_region: "us-west-1",

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: "USER_PASSWORD_AUTH",

        // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: "cal-course.auth.us-west-1.amazoncognito.com",
            scope: ["email", "openid"],
            redirectSignIn: "https://localhost:3000",
            redirectSignOut: "https://calcourse.com",
            responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
    },
});

function App() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                case "cognitoHostedUI":
                    getUser().then((userData) => setUser(userData));
                    break;
                case "signOut":
                    setUser(null);
                    break;
                case "signIn_failure":
                case "cognitoHostedUI_failure":
                    console.log("Sign in failure", data);
                    break;
            }
        });

        getUser().then((userData) => setUser(userData));
    }, []);

    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then((userData) => userData)
            .catch(() => console.log("Not signed in"));
    }

    Auth.currentSession().then((res) => {
        let accessToken = res.getAccessToken().getJwtToken();
        //You can print them to see the full objects
        console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
    });

    // Run this after the sign-in
    // const federatedInfo = Cache.getItem("federatedInfo");
    // const { token } = federatedInfo;
    // console.log(federatedInfo);

    return (
        <div>
            {/* <p>User: {user ? JSON.stringify(user.attributes) : "None"}</p> */}
            <div className="App">
                {user ? (
                    <button onClick={() => Auth.signOut()}>Sign Out</button>
                ) : (
                    <button
                        onClick={() =>
                            Auth.federatedSignIn({
                                provider:
                                    CognitoHostedUIIdentityProvider.Google,
                            })
                        }
                    >
                        Federated Sign In
                    </button>
                )}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="code"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                />
            </div>
            <div>
                <button onClick={() => signUp(username, password, email)}>
                    signUp
                </button>
            </div>
            <div>
                <button onClick={() => confirmSignUp(username, code)}>
                    confirmsignUp
                </button>
            </div>

            <div>
                <button onClick={() => Login(username, password)}>login</button>
            </div>
        </div>
    );
}

export default App;

/* <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/coding-lounge" element={<CodingLounge />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/academic-panel" element={<AcademicPanel />} />
                    <Route path="/userportal" element={<UserPortal />} />
                    <Route path="/event-overview" element={<EventOverview />} />
                    <Route path="/testing" element={<Test />} />
                </Routes>
            </BrowserRouter> */
