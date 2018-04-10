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
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
    pageNumber: number;
    text: string;
    private itemsPerPage: number;
    totalItems: number;
    photos: Photo[] = [];
    isLoading = false;

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

    onScrollDown() {
        this.pageNumber++;
        this.loadPhotos();
    }

    private loadPhotos() {
        this.isLoading = true;
        this.photosSearchSubscribe = this.flickrService
            .photosSearch(this.text, this.pageNumber, this.itemsPerPage)
            .subscribe(
                (res: HttpResponse<PhotoSearchResponse>) => this.onLoadPhotosSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onLoadError(res.body));
    }

    private onLoadPhotosSuccess(data, headers) {
        this.totalItems = data.photos.total;
        const newPhotos: Photo[] = data.photos.photo;
        this.populatePhotosWithSizes(newPhotos);
    }

    private onLoadError(error) {
        this.isLoading = false;
        this.alertService.error(error.stat, error.message, null);
    }

    private populatePhotosWithSizes(newPhotos: Photo[]) {
        for (let index = 0; index < newPhotos.length; index++) {
            this.loadPhotoSizes(newPhotos[index]);
        }
        this.isLoading = false;
    }

    private loadPhotoSizes(photo: Photo) {
        this.flickrService
            .photosGetSizes(photo.id)
            .subscribe(
                (res: HttpResponse<PhotoSizesResponse>) => this.onLoadPhotoSizesSuccess(res.body, res.headers, photo),
                (res: HttpResponse<any>) => this.onLoadError(res.body));
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
        this.photos.push(photo);
    }

    private onLoadNewPhotosSuccess(data, headers) {
        this.totalItems = data.photos.total;
        const newPhotos: Photo[] = data.photos.photo;
        this.populatePhotosWithSizes(newPhotos);
    }

}
