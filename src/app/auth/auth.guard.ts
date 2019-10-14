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
        return new Promise(resolve => {
            this.authService
                .getCurrentUser()
                .then(user => {
                    if (user.uid != null) {
                        resolve(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.router.navigate(["/auth"]);
                    resolve(false);
                });
        });
    }
}
