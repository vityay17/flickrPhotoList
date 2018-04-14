import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../model/photo.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '../model/location.model';

@Component({
  selector: 'jhi-map-photos',
  templateUrl: './map-photos.component.html',
  styles: []
})
export class MapPhotosComponent implements OnInit {
    @Input() photos: Photo[];
    options: any;
    overlays: any[] = [];
    isLoading = false;

    constructor(
        public activeModal: NgbActiveModal
    ) { }

    ngOnInit() {
        this.initLocations();
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 2
        };
    }

    close() {
        this.activeModal.close();
    }

    initLocations() {
        this.isLoading = true;
        for (let i = 0; i < this.photos.length; i++) {
            const photo = this.photos[i];
            this.initLocation(photo.location);
        }
        this.isLoading = false;
    }

    private initLocation(location: Location) {
        if (location && location.latitude) {
            this.overlays.push(
                new google.maps.Marker({
                    position: {
                        lat: +location.latitude,
                        lng: +location.longitude
                    },
                    title: ''
                }));
        }
    }

}
