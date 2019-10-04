import { SharedModule } from "./../shared/shared.module";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ChallengesRoutingModule } from "./challenges-routing.module";
import { ChallengesTabsComponent } from "./challenges-tabs/challenges-tabs.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";
import { TodayComponent } from "./today/today.component";

@NgModule({
    declarations: [ChallengesTabsComponent, CurrentChallengeComponent, TodayComponent],
    imports: [NativeScriptCommonModule, ChallengesRoutingModule, SharedModule],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ChallengesModule {}
