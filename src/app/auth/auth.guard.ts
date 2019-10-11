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
        if (this.authService.getCurrentUser) {
            return true;
        }
        return false;
    }
}
