import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlickrPhotoListSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { FlickrService } from './photo-list/flickr.service';
import { PhotoDetailComponent } from './photo-list/photo-detail/photo-detail.component';

@NgModule({
    imports: [
        FlickrPhotoListSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        PhotoListComponent,
        PhotoDetailComponent
    ],
    entryComponents: [
        PhotoDetailComponent,
        PhotoListComponent
    ],
    providers: [
        FlickrService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlickrPhotoListHomeModule {}
