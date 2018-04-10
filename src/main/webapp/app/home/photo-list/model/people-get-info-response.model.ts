import { Person } from './person.model';

export class PeopleGetInfoResponse {
    constructor(
        public stat: string,
        public person?: Person
    ) {}
}
