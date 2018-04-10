export class Person {
    constructor(
        public id: string,
        public nsid: string,
        public ispro: string,
        public can_buy_pro: string,
        public iconserver: string,
        public iconfarm: string,
        public path_alias: string,
        public has_stats: string,
        public username: {
                _content: string
        },
        public realname: {
                _content: string
        },
        public mbox_sha1sum: {
                _content: string
        },
        public location: {
                _content: string
        },
        public timezone: any,
        public description: {
                _content: string
        },
        public photosurl: any,
        public profileurl: any,
        public mobileurl: any,
        public photos: {
            firstdatetaken: {
                _content: string
            },
            firstdate: {
                _content: string
            },
            count: {
                _content: string
            },
            views: {
                 _content: string
            }
        }
    ) {}
}
