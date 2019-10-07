import { UIService } from "./../../shared/us.service";
import { DayModalComponent } from "./../day-modal/day-modal.component";
import { Component, ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/modal-dialog";

@Component({
    selector: "ns-current-challenge",
    templateUrl: "./current-challenge.component.html",
    styleUrls: ["./current-Challenge.component.common.css", "./current-challenge.component.css"],
    moduleId: module.id,
})
export class CurrentChallengeComponent {
    constructor(private modalDialog: ModalDialogService, private vcRef: ViewContainerRef, private uiService: UIService) {}

    onChange() {
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
}
