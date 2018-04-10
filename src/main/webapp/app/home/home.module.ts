import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlickrPhotoListSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { FlickrService } from './photo-list/flickr.service';

@NgModule({
    imports: [
        FlickrPhotoListSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        PhotoListComponent
    ],
    entryComponents: [
    ],
    providers: [
        FlickrService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlickrPhotoListHomeModule {}
