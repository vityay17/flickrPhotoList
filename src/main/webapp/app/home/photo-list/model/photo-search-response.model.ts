import { Photo } from './photo.model';

export class PhotoSearchResponse {
    constructor(
        public stat: string,
        public photos: {
            page: number,
            pages: number,
            perpage: number,
            total: number,
            photo: Photo[]
        }
    ) {}
}

// class Photos  {
//     constructor(
//         page: number,
//         pages: number,
//         perpage: number,
//         total: number,
//         photo: Photo[]
//     ) {}
// }
