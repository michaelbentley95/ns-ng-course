import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-challenge-edit",
    templateUrl: "./challenge-edit.component.html",
    styleUrls: ["./challenge-edit.component.scss"],
})
export class ChallengeEditComponent implements OnInit {
    isCreating = true;

    constructor(private activatedRoute: ActivatedRoute, private pageRoute: PageRoute, private router: RouterExtensions) {}

    ngOnInit() {
        this.pageRoute.activatedRoute.subscribe(activatedRoute =>
            activatedRoute.paramMap.subscribe(paramMap => {
                if (!paramMap.has("mode")) {
                    this.isCreating = true;
                } else {
                    this.isCreating = paramMap.get("mode") !== "edit";
                }
            })
        );
    }

    onSubmit(title: string, description: string) {
        console.log(title, description);
        this.router.backToPreviousPage();
    }
}
