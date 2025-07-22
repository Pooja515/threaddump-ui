import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StatsComponent } from '../stats/stats';
import { ChartComponent } from '../chart/chart';
import { ThreadTableComponent } from '../thread-table/thread-table';

@Component({
selector: 'app-upload',
standalone: true,
imports: [
CommonModule,
HttpClientModule,
FormsModule,
StatsComponent,
ChartComponent,
ThreadTableComponent
],
templateUrl: './upload.html',
styleUrl: './upload.css'
})
export class UploadComponent implements OnInit {
selectedFile: File | null = null;
response: any;
selectedState: string = 'ALL';
isLoading: boolean = false;

javaProcesses: string[] = [];
selectedPid: string = '';

  remoteHost = '';
  remotePort = '22';
  remotePid = '';
  remoteUser = '';
  remotePassword = '';

constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.fetchJavaProcesses();
}


  fetchJavaProcesses(): void {
    this.http.get<string[]>('http://localhost:8080/api/thread-dump/java-processes')
      .subscribe((res) => this.javaProcesses = res);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/api/thread-dump/parse', formData).subscribe({
      next: (res) => {
        this.response = res;
        this.isLoading = false;
        console.log('Analysis Result:', res);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Upload Error:', err);
        alert('Upload failed. Reason: ' + (err?.message || 'Unknown'));
      }
    });
  }

  captureLiveDump(): void {
    if (!this.selectedPid) return;

    this.isLoading = true;

    this.http.post<any>(`http://localhost:8080/api/thread-dump/capture-dump/${this.selectedPid}`, {}, {})
      .subscribe({
        next: (res) => {
          this.response = res;
          this.isLoading = false;
          console.log('Live Capture Result:', res);

          if (res.downloadUrl) {
            const downloadLink = `http://localhost:8080${res.downloadUrl}`;
            window.open(downloadLink, '_blank');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Capture Error:', err);
          alert('Failed to capture thread dump. Reason: ' + (err?.message || 'Unknown'));
        }
      });
  }

  captureRemoteDump(): void {
    if (!this.remoteHost || !this.remotePort || !this.remotePid || !this.remoteUser || !this.remotePassword) {
      alert('Please fill all remote server details.');
      return;
    }

    const payload = {
      host: this.remoteHost,
      port: this.remotePort,
      pid: this.remotePid,
      username: this.remoteUser,
      password: this.remotePassword
    };

    this.isLoading = true;

    this.http.post<any>('http://localhost:8080/api/thread-dump/remote-capture', payload)
      .subscribe({
        next: (res) => {
          this.response = res;
          this.isLoading = false;
          console.log('Remote Capture Result:', res);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Remote Capture Error:', err);
          alert('Failed to capture remote thread dump. Reason: ' + (err?.error?.error || 'Unknown'));
        }
      });
  }

  getCount(state: string): number {
    if (!this.response?.threads) return 0;
    return this.response.threads.filter((t: any) => t.state === state).length;
  }

  getDeadlockCount(): number {
    if (!this.response?.threads) return 0;
    return this.response.threads.filter((t: any) => t.deadlocked).length;
  }

  getThreadCountsByState(): { [state: string]: number } {
    if (!this.response?.threads) return {};
    const counts: { [state: string]: number } = {};

    for (const thread of this.response.threads) {
      const state = thread.state || 'UNKNOWN';
      counts[state] = (counts[state] || 0) + 1;
    }

    const deadlockedCount = this.getDeadlockCount();
    if (deadlockedCount > 0) {
      counts['DEADLOCKED'] = deadlockedCount;
    }

    return counts;
  }

  onStateSelected(state: string): void {
    this.selectedState = state;
  }
}
