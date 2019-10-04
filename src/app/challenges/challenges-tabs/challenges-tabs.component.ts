import { Page } from 'tns-core-modules/ui/page';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-challenges-tabs',
  templateUrl: './challenges-tabs.component.html',
  styleUrls: ['./challenges-tabs.component.css']
})
export class ChallengesTabsComponent implements OnInit {


    constructor(private router: RouterExtensions, private activeRoute: ActivatedRoute, private page: Page) { }

    ngOnInit() {
            //This allows the tab view to render both the current challenge and today routes similtaniously. These are the two child routes in app-routing.module
            this.router.navigate(
                [{outlets: {currentChallenge: ['current-challenge'], today: ['today']}}],
                {
                    relativeTo: this.activeRoute
                }
            );

            this.page.actionBarHidden = true;

    }

}
