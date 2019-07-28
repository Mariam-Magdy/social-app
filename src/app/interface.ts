// tslint:disable-next-line: class-name
export class postInterface {
    username: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: number;
        geo: {
            lat: number;
            lng: number;
        };
    };
    company: {
        bs: string;
    };
}
