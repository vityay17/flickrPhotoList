import { Injectable } from '@angular/core';

@Injectable()
export class PhotoListService {
    private text: string;

    constructor() {
        this.text = 'dog';
    }

    getText(): string {
        return this.text;
    }

    setText(text: string) {
        this.text = text;
    }
}
