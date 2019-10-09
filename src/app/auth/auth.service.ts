import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { alert } from "tns-core-modules/ui/dialogs";

const FIREBASE_API_KEY = "AIzaSyAsOviqD3TXQNMDGIv1rUhIetjQZcM2-fc";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, { email: email, password: password, returnSecureToken: true }).pipe(
            catchError(errorRes => {
                this.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, { email: email, password: password, returnSecureToken: true }).pipe(
            catchError(errorRes => {
                this.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            })
        );
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
