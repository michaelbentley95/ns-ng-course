import { Page } from "tns-core-modules/ui/page";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { ChallengeService } from "../challenge.service";

@Component({
    selector: "ns-challenges-tabs",
    templateUrl: "./challenges-tabs.component.html",
    styleUrls: ["./challenges-tabs.component.css"],
})
export class ChallengesTabsComponent implements OnInit {
    isLoading = false;

    constructor(
        private router: RouterExtensions,
        private activeRoute: ActivatedRoute,
        private page: Page,
        private challengeService: ChallengeService
    ) {}

    ngOnInit() {
        this.isLoading = true;
        // this.challengeService.fetchCurrentChallenge().subscribe(
        //     res => {
        //         console.log(res);

        //     },
        //     err => {
        //         console.log(err);
        //         this.isLoading = false;
        //         this.loadTabRoutes();
        //     }
        // );

        this.isLoading = false;
        this.loadTabRoutes();
    }

    /**
     * This allows the tab view to render both the current challenge and today routes similtaniously. These are the two child routes in app-routing.module
     */
    private loadTabRoutes() {
        //Wait 10 milliseconds so isLoading has an effect
        setTimeout(() => {
            this.router.navigate([{ outlets: { currentChallenge: ["current-challenge"], today: ["today"] } }], {
                relativeTo: this.activeRoute,
            });
            this.page.actionBarHidden = true;
        }, 10);
    }
}
