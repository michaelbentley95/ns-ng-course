import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AuthComponent } from './auth/auth.component';
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';
import { TodayComponent } from './challenges/today/today.component';
import { ChallengesTabsComponent } from "./challenges/challenges-tabs/challenges-tabs.component";

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'challenge-edit', component: ChallengeEditComponent },
    { path: 'challenges', component: ChallengesTabsComponent, children: [
        { path: 'today', component: TodayComponent, outlet: 'today' },
        { path: 'current-challenge', component: CurrentChallengeComponent, outlet: 'currentChallenge' },
    ] },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})

export class AppRoutingModule {}
