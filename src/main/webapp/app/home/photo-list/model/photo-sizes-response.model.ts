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

// label: Square
// label: Large Square
// label: Thumbnail
// label: Small
// label: Small 320
// label: Medium
// label: Medium 640
// label: Medium 800
// label: Large
// label: Large 1600
// label: Large 2048
// label: Original
