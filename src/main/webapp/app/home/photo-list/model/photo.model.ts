import { PhotoSize } from './photo-size.model';

export class Photo {
    constructor(
        public id?: string,
        public owner?: string,
        public secret?: string,
        public server?: string,
        public farm?: number,
        public title?: string,
        public ispublic?: number,
        public isfriend?: number,
        public isfamily?: number,
        public mediumSize?: PhotoSize,
        public largeSize?: PhotoSize
    ) {}
}
