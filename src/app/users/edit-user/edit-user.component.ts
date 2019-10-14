import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";
import { ImageCropper } from "nativescript-imagecropper";
import * as imageSource from "tns-core-modules/image-source";
import * as fs from "tns-core-modules/file-system";
import { User } from "nativescript-plugin-firebase";

const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-edit-user",
    templateUrl: "./edit-user.component.html",
    styleUrls: ["./edit-user.component.css"],
})
export class EditUserComponent implements OnInit {
    imageAssets = [];
    imageSrc: imageSource.ImageSource;
    thumbSize: number = 80;
    previewSize: number = 300;
    user: User;

    private imageCropper: ImageCropper;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.imageCropper = new ImageCropper();
        this.authService.getCurrentUser().then(thisUser => {
            this.user = thisUser;
        });
    }

    onSelectImage() {
        let context = imagepicker.create({
            mode: "single",
        });
        this.selectAndCrop(context);
        console.log(this.imageSrc.);
    }

    onSaveImage() {
        // firebase.storage
        //     .uploadFile({
        //         // the full path of the file in your Firebase storage (folders will be created)
        //         remoteFullPath: `users/profile/${this.user.uid}.png`,
        //         // option 1: a file-system module File object
        //         localFile: this.imageSrc,
        //         // get notified of file upload progress
        //         onProgress: function(status) {
        //             console.log("Uploaded fraction: " + status.fractionCompleted);
        //             console.log("Percentage complete: " + status.percentageCompleted);
        //         },
        //     })
        //     .then(
        //         function(uploadedFile) {
        //             console.log("File uploaded: " + JSON.stringify(uploadedFile));
        //         },
        //         function(error) {
        //             console.log("File upload error: " + error);
        //         }
        //     );
    }

    private selectAndCrop(context) {
        context
            .authorize()
            .then(() => {
                this.imageAssets = [];
                this.imageSrc = null;
                return context.present();
            })
            .then(selection => {
                let selected = selection.length > 0 ? selection[0] : null;
                selected.getImageAsync(source => {
                    const selectedImgSource = imageSource.fromNativeSource(source);
                    this.imageCropper
                        .show(selectedImgSource, { width: 500, height: 500 })
                        .then(args => {
                            if (args.image !== null) {
                                this.imageSrc = args.image;
                            }
                        })
                        .catch(function(e) {
                            console.log(e);
                        });
                });
            })
            .catch(function(e) {
                console.log(e);
            });
    }
}
