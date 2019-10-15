import { Subscription } from "rxjs";
import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";
import { ImageCropper } from "nativescript-imagecropper";
import { ImageSource, fromFile, fromResource, fromBase64, fromNativeSource } from "tns-core-modules/image-source";
import { Folder, path, knownFolders, File } from "tns-core-modules/file-system";
import { User } from "nativescript-plugin-firebase";

const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-edit-user",
    templateUrl: "./edit-user.component.html",
    styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit, OnDestroy {
    imageAssets = [];
    imageSrc: ImageSource;
    thumbSize: number = 80;
    previewSize: number = 300;
    currentUser: User;
    userSub: Subscription;
    displayName: string;

    private imageCropper: ImageCropper;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.imageCropper = new ImageCropper();
        this.userSub = this.authService.user.subscribe(user => {
            this.currentUser = user;
        });
        this.displayName = this.currentUser.displayName;
    }

    onSelectImage() {
        let context = imagepicker.create({
            mode: "single",
        });
        this.selectAndCrop(context);
    }

    onSave() {
        if (this.imageSrc) {
            this.uploadPicture();
        }
        this.authService.updateName(this.displayName);
    }

    onRemovePicture() {
        this.authService.updatePicture(this.currentUser.uid, true);
    }

    uploadPicture() {
        const folderDest = knownFolders.documents();
        const pathDest = path.join(folderDest.path, "test.png");
        const saved: boolean = this.imageSrc.saveToFile(pathDest, "png");
        const that = this;
        console.log(pathDest);
        if (saved) {
            console.log("Image saved successfully!");
            firebase.storage
                .uploadFile({
                    // the full path of the file in your Firebase storage (folders will be created)
                    remoteFullPath: `users/profile/${this.currentUser.uid}.png`,
                    // option 1: a file-system module File object
                    localFile: File.fromPath(pathDest),
                    // get notified of file upload progress
                    onProgress: function(status) {
                        console.log("Uploaded fraction: " + status.fractionCompleted);
                        console.log("Percentage complete: " + status.percentageCompleted);
                    },
                })
                .then(
                    function(uploadedFile) {
                        console.log("File uploaded: " + JSON.stringify(uploadedFile));
                        that.authService.updatePicture(that.currentUser.uid);
                    },
                    function(error) {
                        console.log("File upload error: " + error);
                    }
                );
        }
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
                    const selectedImgSource = fromNativeSource(source);
                    this.imageCropper
                        .show(selectedImgSource, { width: 500, height: 500, lockSquare: true })
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
    ngOnDestroy() {
        if (this.userSub) this.userSub.unsubscribe();
    }
}
