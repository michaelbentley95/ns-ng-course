import { AuthComponent } from "./auth.component";
import { SharedModule } from "./../shared/shared.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        SharedModule,
        NativeScriptRouterModule.forChild([{ path: "", component: AuthComponent }]),
    ],
})
export class AuthModule {}
