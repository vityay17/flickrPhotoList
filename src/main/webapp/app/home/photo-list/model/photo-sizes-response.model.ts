import { PhotoSize } from './photo-size.model';

export class PhotoSizesResponse {
    constructor(
        public sizes: {
            canblog: number,
            canprint: number,
            candownload: number,
            size: PhotoSize[],
            stat: string
        }
    ) {}
}
