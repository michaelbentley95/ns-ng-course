import { Injectable } from "@angular/core";
import { alert } from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";

const firebase = require("nativescript-plugin-firebase");

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private router: RouterExtensions) {}

    signUp(email: string, password: string) {
        return firebase
            .createUser({
                email: email,
                password: password,
            });
    }

    login(email: string, password: string) {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: email,
                password: password,
            },
        });
    }

    logout() {
        firebase.logout();
        this.router.navigate(["/auth"], { clearHistory: true });
    }

    get isLoggedIn() {
        let result = false;
        firebase
            .getCurrentUser()
            .then(user => (result = true))
            .catch(error => (result = false));
        return result;
    }

    private handleError(errorMessage: string) {
        switch (errorMessage) {
            case "EMAIL_EXISTS":
                alert("This email address exists already!");
                break;
            case "INVALID_PASSWORD":
                alert("Your password is invalid");
                break;
            default:
                alert("Authentication failed, check your credentials.");
        }
    }
}
