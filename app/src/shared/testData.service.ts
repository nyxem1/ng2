import { Injectable } from '@angular/core';
import {  Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TestModel } from '../models/test.model';
import { APIBaseConfig } from '../shared/app.configurations';

@Injectable()
export class RestService {
    private url: string;
    private headers: Headers;

    constructor(private _http: Http, private _apiBaseConfig: APIBaseConfig){
        this.url = _apiBaseConfig.rest_endpoint;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getTestData = (): Observable<TestModel[]> =>{
        return this._http.get(this.url)
            .map((response: Response) => <TestModel[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private prepareOptions = (options: RequestOptionsArgs): RequestOptionsArgs => {
        options = options || {};

        if (!options.headers) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');

        return options;
    }
}