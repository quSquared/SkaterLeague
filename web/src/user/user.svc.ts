import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserTrick } from '../model/user-trick';

@Injectable()
export class UserService {
	private user: any;
	private loggedInSubject = new Subject<any>();

	constructor(private http: Http) {		
	}

	public setLoggedIn(user): void {
		this.store(user);
		this.loggedInSubject.next(user);
	}

	public getLoggedIn(): Observable<any> {
		return this.loggedInSubject.asObservable();
	}

	public store(user) {
		this.user = user;
	}

	public get() {
		return this.user;
	}

	public getTricks(): Observable<UserTrick> {
    let user = this.get();
		return this.http.get(`api/user/${user.id}/tricks`)
			.map(this.extractData)
			.catch(this.handleError);
	}

	public addTrick(userTrick: UserTrick): Observable<any> {
    let user = this.get();
		userTrick.userId = user.id;
		return this.http.post(`api/user/${user.id}/tricks`, userTrick)
			.map(this.extractData)
			.catch(this.handleError);
	}

	public updateTrick(userTrick: UserTrick): Observable<any> {
    let user = this.get();
		userTrick.userId = user.id;
		return this.http.put(`api/user/${user.id}/tricks/${userTrick.id}`, userTrick)
			.map(this.extractData)
			.catch(this.handleError);
	}

	public deleteTrick(userTrick: UserTrick): Observable<any> {
    let user = this.get();
		return this.http.delete(`api/user/${user.id}/tricks/${userTrick.id}`)
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
