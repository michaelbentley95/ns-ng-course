import { SharedModule } from "./../../shared/shared.module";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { EditUserComponent } from "./edit-user.component";

@NgModule({
    declarations: [EditUserComponent],
    imports: [
        SharedModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([{ path: "", component: EditUserComponent }]),
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class EditUserModule {}
