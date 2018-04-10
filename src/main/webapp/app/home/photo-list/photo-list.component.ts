import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlickrService } from './flickr.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpResponse } from '@angular/common/http';
import { PhotoSearchResponse } from './model/photo-search-response.model';
import { Photo } from './model/photo.model';
import { JhiAlertService } from 'ng-jhipster';
import { PhotoSizesResponse } from './model/photo-sizes-response.model';
import { PhotoSize } from './model/photo-size.model';

@Component({
  selector: 'jhi-photo-list',
  templateUrl: './photo-list.component.html',
  styles: []
})
export class PhotoListComponent implements OnInit, OnDestroy {
    pageNumber: number;
    text: string;
    private itemsPerPage: number;
    totalItems: number;
    photos: Photo[];

    private photosSearchSubscribe: Subscription;

    constructor(
        private flickrService: FlickrService,
        private alertService: JhiAlertService,
    ) { }

    ngOnInit() {
        this.pageNumber = 1;
        this.text = 'dog';
        this.itemsPerPage = 20;
        this.loadPhotos();
    }

    ngOnDestroy() {
        this.photosSearchSubscribe.unsubscribe();
    }

    private loadPhotos() {
        this.photosSearchSubscribe = this.flickrService
            .photosSearch(this.text, this.pageNumber, this.itemsPerPage)
            .subscribe(
                (res: HttpResponse<PhotoSearchResponse>) => this.onLoadPhotosSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onLoadPhotosError(res.body));
    }

    private onLoadPhotosSuccess(data, headers) {
        this.totalItems = data.photos.total;
        this.photos = data.photos.photo;
        this.populatePhotosWithSizes();
    }

    private onLoadPhotosError(error) {
        this.alertService.error(error.stat, error.message, null);
    }

    private populatePhotosWithSizes() {
        for (let index = 0; index < this.photos.length; index++) {
            this.loadPhotoSizes(this.photos[index]);
        }
    }

    private loadPhotoSizes(photo: Photo) {
        this.flickrService
            .photosGetSizes(photo.id)
            .subscribe(
                (res: HttpResponse<PhotoSizesResponse>) => this.onLoadPhotoSizesSuccess(res.body, res.headers, photo),
                (res: HttpResponse<any>) => this.onLoadPhotoSizesError(res.body));
    }

    private onLoadPhotoSizesSuccess(data, headers, photo: Photo) {
        const photoSizes: any[] = data.sizes.size;
        for (let index = 0; index < photoSizes.length; index++) {
            const photoSize = photoSizes[index];
            if (photoSize.label === 'Medium') {
                photo.mediumSize = photoSize;
            } else if (photoSize.label === 'Large') {
                photo.largeSize = photoSize;
            }
        }
    }

    private onLoadPhotoSizesError(error) {
        // "stat": "fail", "code": 1, "message": "Photo not found"
        this.alertService.error(error.stat, error.message, null);
    }
}
