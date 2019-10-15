import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { login as firebaseLogin, logout as firebaseLogout, createUser, LoginType, getCurrentUser, updateProfile } from "nativescript-plugin-firebase";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private router: RouterExtensions) {}

    getCurrentUser() {
        return getCurrentUser();
    }

    signUp(email: string, password: string) {
        return createUser({
            email: email,
            password: password,
        });
    }

    login(email: string, password: string) {
        return firebaseLogin({
            type: LoginType.PASSWORD,
            passwordOptions: {
                email: email,
                password: password,
            },
        });
    }

    updateName(){
        updateProfile({})
    }

    updatePicture(generic?: boolean){

        updateProfile({})
    }

    logout() {
        firebaseLogout();
        this.router.navigate(["/auth"], { clearHistory: true });
    }
}
