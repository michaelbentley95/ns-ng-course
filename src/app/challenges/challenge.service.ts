import { AuthService } from "./../auth/auth.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { Challenge } from "./challenge.model";
import { DayStatus, Day } from "./day.model";
import { take, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    constructor(private http: HttpClient, private authService: AuthService) {}

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(title, description, new Date().getFullYear(), new Date().getMonth());
        this.saveToServer(newChallenge);
        this._currentChallenge.next(newChallenge);
    }

    fetchCurrentChallenge() {
        //Does some switchMap magic to make two observable requests and use the results of one in the other.
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get<{ title: string; description: string; month: number; year: number; _days: Day[] }>(
                    `https://ns-ng-course-81f18.firebaseio.com/challenge.json?auth=${currentUser.token}`
                );
            }),
            tap(resData => {
                if (resData) {
                    const loadedChallenge = new Challenge(resData.title, resData.description, resData.year, resData.month, resData._days);
                    this._currentChallenge.next(loadedChallenge);
                }
            })
        );
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

    private saveToServer(challenge: Challenge) {
        this.authService.user
            .pipe(
                take(1),
                switchMap(currentUser => {
                    if (!currentUser || !currentUser.isAuth) {
                        return of(null);
                    }
                    return this.http.put(`https://ns-ng-course-81f18.firebaseio.com/challenge.json?auth=${currentUser.token}`, challenge);
                })
            )
            .subscribe(res => {
                console.log(res);
            });
    }
}
