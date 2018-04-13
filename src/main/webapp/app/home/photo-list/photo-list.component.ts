import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FlickrService } from './flickr.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpResponse } from '@angular/common/http';
import { PhotoSearchResponse } from './model/photo-search-response.model';
import { Photo } from './model/photo.model';
import { JhiAlertService } from 'ng-jhipster';
import { PhotoSizesResponse } from './model/photo-sizes-response.model';
import { PhotoSize } from './model/photo-size.model';
import { PeopleGetInfoResponse } from './model/people-get-info-response.model';
import { Person } from './model/person.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { PhotosGeoGetLocationResponse } from './model/photos-geo-get-location-response.model';
import { Location } from './model/location.model';
import { MapPhotosComponent } from './map-photos/map-photos.component';

@Component({
  selector: 'jhi-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
    pageNumber: number;
    text: string;
    private itemsPerPage: number;
    totalPage: number;
    arraysPhotos: Photo[][] = [[]];
    isLoading = false;
    @Input() userId;
    userListMode = false;

    private photosSearchSubscribe: Subscription;

    constructor(
        private flickrService: FlickrService,
        private alertService: JhiAlertService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.userListMode = this.userId != null;
        this.pageNumber = 0;
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

    onClickViewDetail(photo: Person) {
        const modalRef = this.modalService.open(PhotoDetailComponent, {size: 'lg'});
        modalRef.componentInstance.photo = photo;
        modalRef.result.then((result) => {}, (reason) => {});
    }

    onClickMapOfPhotos() {
        const modalRef = this.modalService.open(MapPhotosComponent, {size: 'lg'});
        // modalRef.componentInstance.photos = this.photos;
        modalRef.result.then((result) => {}, (reason) => {});
    }

    onTextChange() {
        this.arraysPhotos = [];
        this.pageNumber = 0;
        if (this.text && this.text !== '') {
            this.loadPhotos();
        }
    }

    private loadPhotos() {
        this.isLoading = true;
        if (this.userListMode) {
            this.photosSearchSubscribe = this.flickrService
                .peopleGetPhotos(this.userId, this.pageNumber, this.itemsPerPage)
                .subscribe(
                    (res: HttpResponse<PhotoSearchResponse>) => this.onLoadPhotosSuccess(res.body, res.headers),
                    (res: HttpResponse<any>) => this.onLoadError(res.body));
        } else {
            this.photosSearchSubscribe = this.flickrService
                .photosSearch(this.text, this.pageNumber, this.itemsPerPage)
                .subscribe(
                    (res: HttpResponse<PhotoSearchResponse>) => this.onLoadPhotosSuccess(res.body, res.headers),
                    (res: HttpResponse<any>) => this.onLoadError(res.body));
        }
    }

    private onLoadPhotosSuccess(data, headers) {
        this.totalPage = data.photos.pages;
        const newPhotos: Photo[] = data.photos.photo;
        this.populatePhotos(newPhotos);
    }

    private onLoadError(error) {
        this.isLoading = false;
        this.alertService.error(error.stat, error.message, null);
    }

    private populatePhotos(newPhotos: Photo[]) {
        const array: Photo[] = [];
        for (let index = 0; index < newPhotos.length; index++) {
            const photo: Photo = newPhotos[index];
            array.push(photo);
            this.populatePhotoWithSizes(photo);
            this.populatePhotoWithLocation(photo);
            if (!this.userListMode) {
                this.populateWithPhotoAuthorInformation(photo);
            }
        }
        this.arraysPhotos.push(array);
        this.isLoading = false;
    }

    private populatePhotoWithSizes(photo: Photo) {
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
            } else if (photoSize.label === 'Original') {
                photo.largeSize = photoSize;
            }
        }
    }

    private populateWithPhotoAuthorInformation(photo: Photo) {
        this.flickrService
            .peopleGetInfo(photo.owner)
            .subscribe(
                (res: HttpResponse<PeopleGetInfoResponse>) => this.onLoadAuthorInformatioSuccess(res.body, res.headers, photo),
                (res: HttpResponse<any>) => this.onLoadError(res.body));
    }

    private onLoadAuthorInformatioSuccess(data: PeopleGetInfoResponse, headers, photo: Photo) {
        photo.person = data.person;
    }

    private populatePhotoWithLocation(photo: Photo) {
        this.flickrService
            .photosGeoGetLocation(photo.id)
            .subscribe(
                (res: HttpResponse<PhotosGeoGetLocationResponse>) => this.onLoadPhotosGeoGetLocationSuccess(res.body, res.headers, photo),
                (res: HttpResponse<any>) => this.onLoadError(res.body));
    }

    private onLoadPhotosGeoGetLocationSuccess(data: PhotosGeoGetLocationResponse, headers, photo: Photo) {
        if (data.photo) {
            photo.location = new Location(+data.photo.location.latitude, +data.photo.location.longitude);
        }
    }

}
