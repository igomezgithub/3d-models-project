import { Injectable } from '@angular/core';
import { IMAGES } from './images.json';
import { Image } from './image';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private urlEndPoint:string = 'http://localhost:8080/api/images';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  getImages(): Observable<Image[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Image[])
    );
  }

  create(image: Image) : Observable<Image> {
    return this.http.post(this.urlEndPoint, image, {headers: this.httpHeaders}).pipe(
      map( (response) => response as Image)
    );
  }

  getImageById(id): Observable<Image> {
    return this.http.get(`${this.urlEndPoint}/${id}`).pipe(
      map( (response) => response as Image)
    );
  }

  update(image: Image) : Observable<Image> {
      return this.http.put<Image>(`${this.urlEndPoint}/${image.id}`, image, {headers: this.httpHeaders})
  }

  delete(id: number) : Observable<Image> {
      return this.http.delete<Image>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }

  getGraphicModelById(id): Observable<Image> {
    console.log('GraphicModels logger (Image Service)--> URL: ' + this.urlEndPoint + '/' + id);
    return this.http.get(`${this.urlEndPoint}/${id}`).pipe(
      map( (response) => response as Image)
    );
  }

  pushFileToStorage(file): Observable<File> {
      console.log('GraphicModels logger (pushFileToStorage)--> URL: ' + this.urlEndPoint);
      return this.http.post(this.urlEndPoint, file, {headers: this.httpHeaders}).pipe(
        map( (response) => response as File)
      );
    }

  // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
  //     let formdata: FormData = new FormData();
  //
  //     formdata.append('file', file);
  //
  //     console.log('GraphicModels logger (pushFileToStorage)--> URL: ' + this.urlEndPoint);
  //     const req = new HttpRequest('POST', `${this.urlEndPoint}/upload/mtl`, formdata, {
  //       reportProgress: true,
  //       responseType: 'text'
  //     });
  //
  //     return this.http.request(req);
  //   }
}
