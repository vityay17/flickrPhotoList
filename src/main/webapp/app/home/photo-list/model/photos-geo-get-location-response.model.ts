import { Location } from './location.model';

export class PhotosGeoGetLocationResponse {
    constructor(
        public photo: {
            location: Location
        }
    ) {}
}
