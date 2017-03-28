import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Login } from './modals/login';
import { Brand } from './modals/brand';
import { Catalog } from './modals/catalog';
import { Everything } from './modals/everything';

@Injectable()
export class BrandService {

  constructor(private http: Http) { }

  private loginUrl = 'http://localhost:3000/api/login';
  private dashUrl = 'http://localhost:3000/api/everything';
  private brandUrl = 'http://localhost:3000/api/brand';
  private catalogUrl = 'http://localhost:3000/api/catalog';


  authenticate(body: Object): Observable<Login>{
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option
      
      return this.http.post(this.loginUrl, body, options) // ...using post request
                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }

  logOut(): Observable<Login>{
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(this.loginUrl, options) // ...using post request
                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  getEverything(): Observable<Everything>{
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get(this.dashUrl, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  addBrand(body: Object): Observable<Brand>{
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.brandUrl, body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }

  editBrand(body: Object, id: String): Observable<Brand>{
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(this.brandUrl + '/' + id, body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }

  removeBrand(id: String): Observable<Brand>{

    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    
    return this.http.delete(this.brandUrl + '/' + id, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

    }


  editCatalog(body: Object, id: String): Observable<Catalog>{
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    
    return this.http.put(this.catalogUrl + '/' + id, body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }

  removeCatalog(id: String): Observable<Catalog>{

    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    
    return this.http.delete(this.catalogUrl + '/' + id, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }

  addCatalog(body: Object): Observable<Catalog>{
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.catalogUrl, body, options) // ...using post request
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
