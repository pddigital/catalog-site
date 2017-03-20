import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class BrandService {

  constructor(private: http: Http) { }

  login(user): Observable<Hero> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/api/login', user, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

}
