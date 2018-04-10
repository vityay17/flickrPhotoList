import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../model/photo.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-photo-detail',
  templateUrl: './photo-detail.component.html',
  styles: []
})
export class PhotoDetailComponent implements OnInit {
    @Input() photo: Photo;

    constructor(
        public activeModal: NgbActiveModal,
    ) { }

    ngOnInit() {
    }

    close() {
        this.activeModal.close();
    }

}
