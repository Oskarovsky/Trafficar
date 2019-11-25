import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { throwError } from 'rxjs';
import {API_URL} from "../env";
import {Observable} from 'rxjs'
import {Box} from './box-model';
import {catchError, retry} from "rxjs/operators";
import * as Auth0 from 'auth0-web';


@Injectable()
export class BoxesApiService {

  constructor(private http: HttpClient) { }

  _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getBoxes(): Observable<Box[]> {
    return this.http.get<Box[]>(`${API_URL}/boxes`)
      .pipe(
        retry(3),
        catchError(this._handleError)
      );
  }

  saveBox(box: Box): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http
      .post(`${API_URL}/boxes`, box, httpOptions);
  }

  deleteBox(boxId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http
      .delete(`${API_URL}/boxes/${boxId}`, httpOptions);
  }
}
