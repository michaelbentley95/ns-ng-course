import { AuthService } from "./../auth/auth.service";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, of, Subscription } from "rxjs";
import { Challenge } from "./challenge.model";
import { DayStatus, Day } from "./day.model";
import { take, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { User } from "nativescript-plugin-firebase";

const firebase = require("nativescript-plugin-firebase/app");

@Injectable({ providedIn: "root" })
export class ChallengeService implements OnDestroy {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);
    private userSub: Subscription;
    private currentUser: User;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.userSub = this.authService.user.subscribe(user => {
            this.currentUser = user;
        });
    }

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(title, description, new Date().getFullYear(), new Date().getMonth());
        this.saveToServer(newChallenge);
        this._currentChallenge.next(newChallenge);
    }

    fetchCurrentChallenge() {
        let resData = firebase
            .firestore()
            .collection("challenges")
            .doc(this.currentUser.uid);
        resData.get().then(doc => {
            const obj = doc.data();
            const loadedChallenge = new Challenge(obj.title, obj.description, obj.year, obj.month, obj._days);
            this._currentChallenge.next(loadedChallenge);
        });
    }

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

    private saveToServer(challenge: Challenge) {
        firebase
            .firestore()
            .collection("challenges")
            .doc(this.currentUser.uid)
            .set(challenge);
    }
}
