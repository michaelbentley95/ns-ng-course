import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
    selector: "ns-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLogin = true;

    @ViewChild("passwordElement", { static: false }) passwordElement: ElementRef<TextField>;
    @ViewChild("emailElement", { static: false }) emailElement: ElementRef<TextField>;

    constructor(private router: RouterExtensions) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl("asdf@asdf.asdf", { updateOn: "blur", validators: [Validators.required, Validators.email] }),
            password: new FormControl("asdfasdf", { updateOn: "blur", validators: [Validators.required, Validators.minLength(6)] }),
        });

        this.form.get("email").statusChanges.subscribe(status => {
            this.emailControlIsValid = status === "VALID";
        });
        this.form.get("password").statusChanges.subscribe(status => {
            this.passwordControlIsValid = status === "VALID";
        });
    }

    onSubmit() {
        //This makes sure that the value gets updated on blur
        this.emailElement.nativeElement.focus();
        this.passwordElement.nativeElement.focus();
        this.passwordElement.nativeElement.dismissSoftInput();

        if (!this.form.valid) {
            return;
        }

        const email = this.form.get("email").value;
        const password = this.form.get("password").value;
        this.form.reset();
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
        if (this.isLogin) {
            console.log("Logging In");
        } else {
            console.log("signing Up");
        }
        this.router.navigate(["/challenges"]);
    }

    onSwitch() {
        this.isLogin = !this.isLogin;
    }
}
