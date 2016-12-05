import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
	private user: any;
  private loggedInSubject = new Subject<any>();

	constructor(private http: Http) { 
			console.log('user service contructed');}	

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
}
