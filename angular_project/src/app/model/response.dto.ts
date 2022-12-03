export class ResponseDTO {
    result: any;
    auth: boolean;
    id?: number;

    constructor(result: any, auth: boolean, id?: number) {
        this.result = result;
        this.auth = auth;
        this.id = id;
    }
}
