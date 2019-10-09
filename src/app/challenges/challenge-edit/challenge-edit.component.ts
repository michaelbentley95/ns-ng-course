import { ChallengeService } from "./../challenge.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { take } from "rxjs/operators";

@Component({
    selector: "ns-challenge-edit",
    templateUrl: "./challenge-edit.component.html",
    styleUrls: ["./challenge-edit.component.scss"],
})
export class ChallengeEditComponent implements OnInit {
    isCreating = true;
    title = "";
    description = "";

    constructor(private activatedRoute: ActivatedRoute, private pageRoute: PageRoute, private router: RouterExtensions, private challengeService: ChallengeService) {}

    ngOnInit() {
        this.pageRoute.activatedRoute.subscribe(activatedRoute =>
            activatedRoute.paramMap.subscribe(paramMap => {
                if (!paramMap.has("mode")) {
                    this.isCreating = true;
                } else {
                    this.isCreating = paramMap.get("mode") !== "edit";
                }

                if (!this.isCreating) {
                    this.challengeService.currentChallenge.pipe(take(1)).subscribe(challenge => {
                        this.title = challenge.title;
                        this.description = challenge.description;
                    });
                }
            })
        );
    }

    onSubmit(title: string, description: string) {
        if (this.isCreating) {
            this.challengeService.createNewChallenge(title, description);
        } else {
            this.challengeService.updateChallenge(title, description);
        }

        this.router.backToPreviousPage();
    }
}
