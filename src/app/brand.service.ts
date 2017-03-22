import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Login } from './login';
import { Brand } from './brand';


@Injectable()
export class BrandService {

  constructor(private http: Http) { }

  private loginUrl = 'http://localhost:3000/api/login';
  private brandUrl = 'http://localhost:3000/api/brand';


  addBrand(body: Object): Observable<Brand>{
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    console.log(body);
    return this.http.post(this.brandUrl, body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }


  upload(file) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
           let formData = new FormData();
           formData.append("theFile", file.files[0]);
        xhr.open('POST', 'http://localhost:3000/api/file', true);
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {

            let response = JSON.parse(xhr.response);
            resolve(response);
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText,
              statusMessage: xhr.response
            });
          }
        };
        xhr.onerror = function () {
          reject({
            status: this.status,
            statusText: xhr.statusText,
            statusMessage: xhr.response
          });
        };
        xhr.send(formData);
      });
    }

}
