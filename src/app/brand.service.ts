import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Login } from './login';

@Injectable()
export class BrandService {

  constructor(private http: Http) { }

  private loginUrl = 'http://localhost:3000/api/login';
  private catalogUrl = 'http://localhost:3000/api/catalogs';


  authenticate(body: Object): Observable<Login[]>{
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.loginUrl, body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }
}
