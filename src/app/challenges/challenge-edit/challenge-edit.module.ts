import { ChallengeEditComponent } from "./challenge-edit.component";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    declarations: [ChallengeEditComponent],
    imports: [SharedModule, NativeScriptFormsModule, NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptRouterModule.forChild([{ path: "", component: ChallengeEditComponent }])],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ChallengeEditModule {}
