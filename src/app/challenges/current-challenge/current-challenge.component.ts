import { Component} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";




@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css'],
    moduleId: module.id
})

export class CurrentChallengeComponent {
    constructor(private router: RouterExtensions) { }

    ngOnInit() {

    }

    onEdit() {
        this.router.navigate(['/challenge-edit'], {transition: {name: 'slideLeft'}});
    }


}
