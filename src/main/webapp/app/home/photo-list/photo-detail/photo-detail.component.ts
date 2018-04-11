import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../model/photo.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlickrService } from '../flickr.service';
import { HttpResponse } from '@angular/common/http';
import { PhotosGeoGetLocationResponse } from '../model/photos-geo-get-location-response.model';
import { Location } from '../model/location.model';
declare var google: any;

@Component({
  selector: 'jhi-photo-detail',
  templateUrl: './photo-detail.component.html',
  styles: []
})
export class PhotoDetailComponent implements OnInit {
    @Input() photo: Photo;
    isLocationExist = false;
    isLoading = false;
    options: any;
    overlays: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private flickrService: FlickrService
    ) { }

    ngOnInit() {
        this.getLocation();
    }

    close() {
        this.activeModal.close();
    }

    private getLocation() {
        this.isLoading = true;
        this.flickrService
            .photosGeoGetLocation(this.photo.id)
            .subscribe(
                (res: HttpResponse<PhotosGeoGetLocationResponse>) => {
                    this.initLocation(res.body.photo.location);
                },
                (res: HttpResponse<any>) => {});
    }

    private initLocation(location: Location) {
        this.isLoading = false;
        if (location.latitude) {
            this.isLocationExist = true;
            this.options = {
                center: {lat: +location.latitude, lng: +location.longitude},
                zoom: 5
            };
            this.overlays = [
                new google.maps.Marker({position: {lat: +location.latitude, lng: +location.longitude}, title: ''})];
        }
    }
}
