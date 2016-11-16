import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable() 
export class SignInService {
    private signUrl = 'api/auth/google';

    constructor (private http: Http) {}

    authenticate (): Observable<any> {
        return this.http.get(this.signUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getFlipTricks (): Observable<any> {
        return this.http.get('api/flipTricks')
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log('body', body);
        return body.data || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}