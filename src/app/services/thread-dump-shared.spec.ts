import { TestBed } from '@angular/core/testing';

import { ThreadDumpShared } from './thread-dump-shared';

describe('ThreadDumpShared', () => {
  let service: ThreadDumpShared;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadDumpShared);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
