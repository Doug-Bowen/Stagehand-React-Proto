export class UrlsUtil {
    _landingPage: string = 'http://localhost:3000/';

    //Chunks
    _authorization: string = 'authorizations';

    //Pages
    _AuthorizationCreatePage: string = this._landingPage + this._authorization + '/create';
    _AuthorizationDetailsPage: string = this._landingPage + this._authorization + '/details';
}

