import { Component, OnInit } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";

@Component({
    selector: "ns-edit-user",
    templateUrl: "./edit-user.component.html",
    styleUrls: ["./edit-user.component.css"],
})
export class EditUserComponent {
    imageAssets = [];
    imageSrc: any;
    thumbSize: number = 80;
    previewSize: number = 300;

    public onSelectSingleTap() {

        let context = imagepicker.create({
            mode: "single",
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        context
            .authorize()
            .then(() => {
                this.imageAssets = [];
                this.imageSrc = null;
                return context.present();
            })
            .then(selection => {
                console.log("Selection done: " + JSON.stringify(selection));
                this.imageSrc = selection.length > 0 ? selection[0] : null;

                // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                selection.forEach(function(element) {
                    element.options.width = this.previewSize;
                    element.options.height = this.previewSize;
                });

                this.imageAssets = selection;
            })
            .catch(function(e) {
                console.log(e);
            });
    }
}
