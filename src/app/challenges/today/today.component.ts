import { Subscription } from "rxjs";
import { ChallengeService } from "./../challenge.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Day, DayStatus } from "../day.model";

@Component({
    selector: "ns-today",
    templateUrl: "./today.component.html",
    styleUrls: ["./today.component.scss"],
})
export class TodayComponent implements OnInit, OnDestroy {
    currChallengeSub: Subscription;
    currentDay: Day;

    constructor(private challengeService: ChallengeService) {}

    ngOnInit() {
        this.currChallengeSub = this.challengeService.currentChallenge.subscribe(challenge => {
            if (challenge) {
                this.currentDay = challenge.currentDay;
            }
        });
    }

    onActionSelected(action: DayStatus) {
        this.challengeService.updateDayStatus(this.currentDay.dayInMonth, action);
    }

    ngOnDestroy() {
        if (this.currChallengeSub) this.currChallengeSub.unsubscribe();
    }

    getActionName() {
        if (this.currentDay.status === DayStatus.Completed) {
            return "complete";
        } else if (this.currentDay.status === DayStatus.Failed) {
            return "fail";
        }
        return null;
    }
}
