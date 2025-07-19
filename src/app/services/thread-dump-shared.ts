import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadDumpSharedService {
  private threadDumpDataSource = new BehaviorSubject<any>(null);
  threadDumpData$ = this.threadDumpDataSource.asObservable();

  constructor() {}

  
  setThreadDumpData(data: any): void {
    this.threadDumpDataSource.next(data);
  }

  clearData(): void {
    this.threadDumpDataSource.next(null);
  }
}

