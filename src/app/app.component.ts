import { RouterExtensions } from "nativescript-angular/router";
import { AuthService } from "./auth/auth.service";
import { UIService } from "./shared/us.service";
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) drawerComponent: RadSideDrawerComponent;

    activeChallenge: string = "";
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;

    constructor(
        private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef,
        private authService: AuthService,
        private router: RouterExtensions
    ) {}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(x => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
        this.uiService.setRootVCRef(this.vcRef);

        firebase
            .init({
                onAuthStateChanged: function(data) {
                    // optional but useful to immediately re-logon the user when he re-visits your app
                    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                    if (data.loggedIn) {
                        console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
                    }
                },
            })
            .then(
                () => {
                    console.log("firebase.init done");
                },
                error => {
                    console.log(`firebase.init error: ${error}`);
                }
            );
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    onChallengeInput(challengeDescription: string) {
        this.activeChallenge = challengeDescription;
    }

    onEditProfile() {
        this.router.navigate(["/user/edit"]);
        this.uiService.toggleDrawer();
    }

    onLogout() {
        this.uiService.toggleDrawer();
        this.authService.logout();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }
}
