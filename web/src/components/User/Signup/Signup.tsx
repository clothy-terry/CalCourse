import "./Signup.css";
import { Amplify } from "aws-amplify";

import {
    withAuthenticator,
    WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

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
            domain: "https://cal-course.auth.us-west-1.amazoncognito.com",
            scope: ["email", "openid"],
            redirectSignIn: "https://calcourse.com",
            redirectSignOut: "https://calcourse.com",
            responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
    },
});

interface Props extends WithAuthenticatorProps {
    isPassedToWithAuthenticator: boolean;
}

function Signup({ isPassedToWithAuthenticator, signOut, user }: Props) {
    return (
        <>
            console.log("sdfs")
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
        </>
    );
}

export default withAuthenticator(Signup);

export async function getStaticProps() {
    return {
        props: {
            isPassedToWithAuthenticator: true,
        },
    };
}
