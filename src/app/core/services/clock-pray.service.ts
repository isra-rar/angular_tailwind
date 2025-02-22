import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ClockPrayRequest, ClockPrayResponse, ClockTimeResponse } from '../../models/clock-pray.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClockPrayService {

  private clocksTimesSubject = new BehaviorSubject<ClockTimeResponse[]>([]);
  cloksTimes$ = this.clocksTimesSubject.asObservable(); 

  private clocksSubject = new BehaviorSubject<ClockPrayResponse[]>([]);
  clocks$ = this.clocksSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  createClockPray(clockPrayRequest: ClockPrayRequest) : Observable<any> {
    return this.http.post(`${environment.api.clockPray}/create`, clockPrayRequest);
  }

  getClockPrayers() {
    this.http.get<ClockPrayResponse[]>(`${environment.api.clockPray}/clockPrays`).subscribe({
      next: (data) => {
        this.clocksSubject.next(data);
      },
      error: (err) => {
        console.error('Erro ao buscar ClockPrays: ', err);
      }
    });
  }

  getClockTimesClockPrayerId(clockPrayerId: number): Observable<ClockTimeResponse[]> {
    return this.http.get<ClockTimeResponse[]>(`${environment.api.clockPray}/clockTimes/${clockPrayerId}`).pipe(
      tap(clockTimes => {
        this.clocksTimesSubject.next(clockTimes); 
      })
    );
  }

  reserveClockTime(clockTimeId: number, memberId: number): Observable<any> {
    return this.http.put(`${environment.api.clockPray}/reserved/${clockTimeId}/${memberId}`, {});
  }

  getClocks() {
    return this.clocks$;
  }

  getClockTimes() {
    return this.cloksTimes$;
  }

}
