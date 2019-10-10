import { Page } from "tns-core-modules/ui/page";
import { AuthService } from "./../auth/auth.service";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, of, Subscription } from "rxjs";
import { Challenge } from "./challenge.model";
import { DayStatus, Day } from "./day.model";
import { take, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ChallengeService implements OnDestroy {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);
    private userSub: Subscription;

    constructor(private http: HttpClient, private authService: AuthService) {}

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(title, description, new Date().getFullYear(), new Date().getMonth());
        this.saveToServer(newChallenge);
        this._currentChallenge.next(newChallenge);
    }

    fetchCurrentChallenge() {}

    updateChallenge(title: string, description: string) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            const updatedChallenge = new Challenge(title, description, challenge.year, challenge.month, challenge.days);
            this.saveToServer(updatedChallenge);
            this._currentChallenge.next(updatedChallenge);
        });
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            if (!challenge || challenge.days.length < dayInMonth) {
                return;
            }
            const dayIndex = challenge.days.findIndex(d => d.dayInMonth === dayInMonth);
            challenge.days[dayIndex].status = status;
            this._currentChallenge.next(challenge);
            this.saveToServer(challenge);
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    private saveToServer(challenge: Challenge) {}
}
