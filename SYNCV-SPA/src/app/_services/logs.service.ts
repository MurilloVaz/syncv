import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '../../../node_modules/@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { PaginatedResult } from '../_interfaces/Pagination';
import { Log } from '../_interfaces/Log';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  baseUrl: string = environment.baseUrl + 'logs/';

  constructor(private http: HttpClient) { }

  loadLogs(page?, itemsPerPage?): Observable<PaginatedResult<Log[]>> {

    const paginatedResult: PaginatedResult<Log[]> = new PaginatedResult<Log[]>();

    let paramsRequest = null;

    if (page && itemsPerPage) {
      paramsRequest = new HttpParams().append('pageNumber', page.toString()).append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Log[]>(this.baseUrl, { observe: 'response', params: paramsRequest })
      .pipe(map(response => {
        paginatedResult.result = response.body;

        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      }));

  }

  loadStatistics(withError?): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'Statistics?withErrors=' + withError);
  }

  loadStatisticsByRange(start: Date, end: Date): Observable<Log[]> {

    const dateRange = {
      startDate: start,
      endDate: end
    };

    return this.http.put<Log[]>(this.baseUrl + 'StatisticsByRange', dateRange);
  }
}
