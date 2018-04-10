import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FlickrService } from '../flickr.service';
import { Person } from '../model/person.model';
import { HttpResponse } from '@angular/common/http';
import { PeopleGetInfoResponse } from '../model/people-get-info-response.model';

@Component({
  selector: 'jhi-person-detail',
  templateUrl: './person-detail.component.html',
  styles: []
})
export class PersonDetailComponent implements OnInit {

    private subscription: Subscription;
    userId;
    person: Person;

    constructor(
        private route: ActivatedRoute,
        private flickrService: FlickrService,
    ) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['userid']);
        });
    }

    load(userid) {
        this.userId = userid;
        this.getAuthorInformation();
    }

    private getAuthorInformation() {
        this.flickrService
            .peopleGetInfo(this.userId)
            .subscribe(
                (res: HttpResponse<PeopleGetInfoResponse>) => {
                    this.person = res.body.person;
                },
                (res: HttpResponse<any>) => {});
    }

}
