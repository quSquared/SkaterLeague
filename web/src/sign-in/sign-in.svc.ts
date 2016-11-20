import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable() 
export class SignInService {
    private signUrl = 'api/auth/google';

    constructor (private http: Http) {}

    googleAuth (): Observable<any> {
        return this.http.get('https://accounts.google.com/o/oauth2/v2/auth'+
            '?scope=email%20profile'+
            '&prompt=select_account'+
            '&state=%2Fprofile'+
            '&redirect_uri=http://localhost:3000/api/oauth2callback'+
            '&response_type=token&client_id=1021813975482-a5gslll0cbgn5bivojbhivek2i5eg8hv.apps.googleusercontent.com')
                        .map(this.extractData)
                        .catch(this.handleError);
    }

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