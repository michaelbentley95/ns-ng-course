import { Subscription } from "rxjs";
import { UIService } from "./../../shared/us.service";
import { DayModalComponent } from "./../day-modal/day-modal.component";
import { Component, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ChallengeService } from "../challenge.service";
import { Challenge } from "../challenge.model";

@Component({
    selector: "ns-current-challenge",
    templateUrl: "./current-challenge.component.html",
    styleUrls: ["./_current-Challenge.component.common.scss", "./current-challenge.component.scss"],
    moduleId: module.id,
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
    weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    currentChallenge: Challenge;
    private currChallengeSub: Subscription;

    constructor(private modalDialog: ModalDialogService, private vcRef: ViewContainerRef, private uiService: UIService, private challengeService: ChallengeService) {}

    ngOnInit() {
        this.currChallengeSub = this.challengeService.currentChallenge.subscribe(challenge => {
            this.currentChallenge = challenge;
        });
    }

    onChangeStatus() {
        this.modalDialog
            .showModal(DayModalComponent, {
                fullscreen: true,
                viewContainerRef: this.uiService.getRootVCRef() ? this.uiService.getRootVCRef() : this.vcRef,
                context: { date: new Date() },
            })
            .then((action: string) => {
                console.log(action);
            });
    }

    getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

        return startRow + weekRow + irregularRow;
    }

    ngOnDestroy() {
        if (this.currChallengeSub) {
            this.currChallengeSub.unsubscribe();
        }
    }
}
