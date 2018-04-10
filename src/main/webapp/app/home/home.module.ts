import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlickrPhotoListSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { FlickrService } from './photo-list/flickr.service';
import { PhotoDetailComponent } from './photo-list/photo-detail/photo-detail.component';
import { PersonDetailComponent } from './photo-list/person-detail/person-detail.component';
import { PhotoListRoutes } from './photo-list/photo-list.routing';

@NgModule({
    imports: [
        FlickrPhotoListSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        PhotoListRoutes
    ],
    declarations: [
        HomeComponent,
        PhotoListComponent,
        PhotoDetailComponent,
        PersonDetailComponent
    ],
    entryComponents: [
        PhotoDetailComponent,
        PhotoListComponent,
        PersonDetailComponent
    ],
    providers: [
        FlickrService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlickrPhotoListHomeModule {}
