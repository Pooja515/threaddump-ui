import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from './components/upload/upload';
import { ThreadTableComponent } from './components/thread-table/thread-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UploadComponent,
    ThreadTableComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // ✅ Fixed: styleUrls (plural)
})
export class App {
  protected title = 'threaddump-ui';
}
