import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
	private user: any;
	private loggedInSubject = new Subject<any>();

	constructor(private http: Http) {		
	}

	setLoggedIn(user): void {
		this.store(user);
		this.loggedInSubject.next(user);
	}

	getLoggedIn(): Observable<any> {
		return this.loggedInSubject.asObservable();
	}

	store(user) {
		this.user = user;
	}

	get() {
		return this.user;
	}

	getTricks(): Observable<any> {
    let user = this.get();
		return this.http.get(`api/user/${user.id}/tricks`)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body || {};
	}

	private handleError(error: Response | any) {
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
