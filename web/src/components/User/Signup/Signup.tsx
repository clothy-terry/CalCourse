import "./Signup.css";
import { Auth } from "aws-amplify";

async function signUp(username: string, password: string, email: string) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email, // optional
            },
            autoSignIn: {
                // optional - enables auto sign in after user is confirmed
                enabled: true,
            },
        });
        console.log(user);
    } catch (error) {
        console.log("error signing up:", error);
    }
}

async function confirmSignUp(username: string, code: string) {
    try {
        await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log("error confirming sign up", error);
    }
}

// async function resendConfirmationCode() {
//     try {
//         await Auth.resendSignUp(username);
//         console.log("code resent successfully");
//     } catch (err) {
//         console.log("error resending code: ", err);
//     }
// }

export { signUp, confirmSignUp };
