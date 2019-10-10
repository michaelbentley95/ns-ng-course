import { AuthService } from "./auth.service";
import { CanLoad } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { RouterExtensions } from "nativescript-angular/router";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(private authService: AuthService, private router: RouterExtensions) {}

    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
        let result = false;
        firebase
            .getCurrentUser()
            .then((result = true))
            .catch(err => {
                console.log(err);
                this.router.navigate(["/auth"]);
            });
        return result;
    }
}
