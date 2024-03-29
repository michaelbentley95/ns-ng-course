import { UIService } from "./../../us.service";
import { Component, OnInit, Input } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";

declare var android: any;

@Component({
    selector: "ns-action-bar",
    templateUrl: "./action-bar.component.html",
    styleUrls: ["./action-bar.component.css"],
})
export class ActionBarComponent implements OnInit {
    @Input() title: string;
    @Input() showBackButton = true;
    @Input() hasMenu = true;

    constructor(private page: Page, private router: RouterExtensions, private uiService: UIService) {}

    ngOnInit() {}

    get android() {
        return isAndroid;
    }

    get canGoBack() {
        return this.router.canGoBack() && this.showBackButton;
    }

    onGoBack() {
        this.router.backToPreviousPage();
    }

    onLoadedActionBar() {
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const navBarButton = androidToolbar.getNavigationIcon();
            let color = this.hasMenu ? "#ffffff" : "#ffffff";
            if (navBarButton) {
                navBarButton.setColorFilter(android.graphics.Color.parseColor(color), (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
            }
        }
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }
}
