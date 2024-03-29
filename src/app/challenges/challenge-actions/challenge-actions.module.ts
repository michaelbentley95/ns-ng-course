import { ChallengeActionsComponent } from "./challenge-actions.component";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@NgModule({
    declarations: [ChallengeActionsComponent],
    imports: [NativeScriptCommonModule],
    exports: [ChallengeActionsComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ChallengeActionsModule {}
