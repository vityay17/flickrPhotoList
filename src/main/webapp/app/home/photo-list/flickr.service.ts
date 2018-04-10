import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PhotoSearchResponse } from './model/photo-search-response.model';
import { PhotoSizesResponse } from './model/photo-sizes-response.model';

@Injectable()
export class FlickrService {
    private apiKey = 'api_key=daf3f7bf0e620efdbd28c29bb5bbc3e6';

    // apiurl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=apiKey&text=dogs&format=json&nojsoncallback=1&page=2&per_page=20';
    private flickrApiUrl = `https://api.flickr.com/services/rest/?${this.apiKey}&format=json&nojsoncallback=1&method=`;
    private resourcePhotosSearchUrl = `${this.flickrApiUrl}flickr.photos.search&`;
    private resourcePhotosGetSizesUrl = `${this.flickrApiUrl}flickr.photos.getSizes&`;

    constructor(
        private http: HttpClient
    ) { }

    photosSearch(text: string, pageNumber: number, itemsPerPage: number): Observable<HttpResponse<PhotoSearchResponse>> {
        return this.http.get<PhotoSearchResponse>(
            `${this.resourcePhotosSearchUrl}text=${text}&page=${pageNumber}&per_page=${itemsPerPage}`,
            { observe: 'response' });
    }

    photosGetSizes(photoId: string): Observable<HttpResponse<PhotoSizesResponse>> {
        // apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes
        // &api_key=daf3f7bf0e620efdbd28c29bb5bbc3e6
        // &photo_id=" + myresult.id + "&format=json&nojsoncallback=1";

        return this.http.get<PhotoSizesResponse>(
            `${this.resourcePhotosGetSizesUrl}photo_id=${photoId}`,
            { observe: 'response' });
    }
}
