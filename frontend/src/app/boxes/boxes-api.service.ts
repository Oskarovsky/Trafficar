import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { throwError } from 'rxjs';
import {API_URL} from "../env";
import {Observable} from 'rxjs'
import {Box} from './box-model';
import {catchError, retry} from "rxjs/operators";


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


}
