import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import {
    login as firebaseLogin,
    logout as firebaseLogout,
    createUser,
    LoginType,
    getCurrentUser,
    updateProfile,
    User,
} from "nativescript-plugin-firebase";
import { BehaviorSubject } from "rxjs";

const firebaseWebApi = require("nativescript-plugin-firebase/app");

@Injectable({ providedIn: "root" })
export class AuthService {
    private _user = new BehaviorSubject<User>(null);
    genericPhoto =
        "https://firebasestorage.googleapis.com/v0/b/ns-ng-course-81f18.appspot.com/o/users%2Fprofile%2FDefault.png?alt=media&token=a3d3339f-bc94-4879-a321-7570717cc3ea";

    constructor(private router: RouterExtensions) {
        this.refreshUser();
    }

    refreshUser() {
        getCurrentUser().then(user => {
            this._user.next(user);
        });
    }

    get user() {
        return this._user.asObservable();
    }

    signUp(email: string, password: string) {
        return createUser({
            email: email,
            password: password,
        });
    }

    login(email: string, password: string) {
        return new Promise(resolve => {
            firebaseLogin({
                type: LoginType.PASSWORD,
                passwordOptions: {
                    email: email,
                    password: password,
                },
            })
                .then(login => {
                    this.refreshUser();
                    resolve(login);
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    updateName(newName: string) {
        updateProfile({ displayName: newName });
        //FireBase is weird, so the display name won't update until the user logs out and back in
        //So we're just gonna emit our own User.
        let user: User = this._user.getValue();
        user.displayName = newName;
        this._user.next(user);
    }

    updatePicture(uid: string, generic: boolean = false) {
        if (generic) {
            updateProfile({
                photoURL: this.genericPhoto,
            });
            //FireBase is weird, so the display name won't update until the user logs out and back in
            //So we're just gonna emit our own User.
            let user: User = this._user.getValue();
            user.photoURL = this.genericPhoto;
            this._user.next(user);
        } else {
            //TODO: Set this with the user
            const storageRef = firebaseWebApi.storage().ref();
            const childRef = storageRef.child(`users/profile/${uid}.png`);

            childRef
                .getDownloadURL()
                .then(theUrl => {
                    console.log("Download url: " + theUrl);
                    updateProfile({ photoURL: theUrl });
                    //FireBase is weird, so the display name won't update until the user logs out and back in
                    //So we're just gonna emit our own User.
                    let user: User = this._user.getValue();
                    user.photoURL = theUrl;
                    this._user.next(user);
                })
                .catch(error => console.log("Download error: " + error));
        }
    }

    logout() {
        firebaseLogout();
        this.router.navigate(["/auth"], { clearHistory: true });
    }
}
