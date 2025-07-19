import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-thread-table',
standalone: true,
imports: [CommonModule],
templateUrl: './thread-table.html',
styleUrl: './thread-table.css'
})
export class ThreadTableComponent {
@Input() threads: any[] = [];
@Input() selectedState: string = 'ALL';

expandedThreadId: string | null = null;

// ✅ THIS is the method to toggle the stacktrace view
toggleStack(threadId: string): void {
    this.expandedThreadId = this.expandedThreadId === threadId ? null : threadId;
  }

  // Optional: filter logic for UI
  get filteredThreads(): any[] {
    if (!this.threads?.length) return [];
    if (this.selectedState === 'ALL') return this.threads;
    if (this.selectedState === 'DEADLOCKED') return this.threads.filter(t => t.deadlocked);
    return this.threads.filter(t => t.state === this.selectedState);
  }

  // Optional: helper for thread grouping
  getGroupFromThread(name: string): string {
    if (!name) return '';
    if (name.includes('AMQP')) return 'AMQP';
    if (name.includes('Rabbit')) return 'org.springframework.amqp.rabbit';
    if (name.includes('Log4j')) return 'Log4j2';
    if (name.includes('Service')) return 'Service';
    if (name.includes('Compiler')) return name.split(' ')[0];
    return 'General';
  }
}
