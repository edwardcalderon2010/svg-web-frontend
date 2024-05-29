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
  private svgRemoteClient = 'http://localhost:8898/svgweb/svg_web_app/remote/svg_gen/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'image/svg+xml' })
  };


  constructor(private http:HttpClient) {
  }

  getSVG(svgText: any): Observable<SvgResponse> {
      const encodedText = encodeURIComponent(svgText);
      //console.log('Processing as unencoded: ' + encodedText);
      //console.log('Processing as encoded: ' + svgText);
      //console.log('Calling svg-fetch.getSVG with: ' + url);
      console.log('Calling svg-fetch.getSVG with CORS header ');
      const url = this.svgRemoteClient + encodedText;
      return this.http.get<SvgResponse>(url,{
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      });
  }

  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.log("Caught error during getSVG: " + error);
      return of(result as T);
    }
  }

}
