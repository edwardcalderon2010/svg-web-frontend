import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";
import {SvgResponse} from '../model/svg-response'

@Injectable({
  providedIn: 'root'
})
export class SvgFetchService {

  private svgGeneratorUrl = 'http://localhost:8900/svg_gen/generateAsJSON/';
  private svgHelloUrl = 'http://localhost:8898/svg_web_app/hello';
  private svgRemoteClient = 'http://localhost:8898/svg_web_app/remote/svg_gen/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'image/svg+xml' })
  };


  constructor(private http:HttpClient) {
  }

  getSVG(svgText: any): Observable<SvgResponse> {
      var url = this.svgRemoteClient + svgText;
      console.log('Calling svg-fetch.getSVG with: ' + url);
      return this.http.get<SvgResponse>(url);
  }

  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.log("Caught error during getSVG: " + error);
      return of(result as T);
    }
  }

}
