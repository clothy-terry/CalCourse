import React, { useState } from "react";
// import "./Login.css";
import CourseAPI from "../../../requests/CourseAPI";
import LoginAPI from "../../../requests/LoginAPI";
import { Auth } from "aws-amplify";

async function Login(username: string, password: string) {
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log("error signing in", error);
    }
}

export default Login;
