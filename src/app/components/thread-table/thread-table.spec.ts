import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadTable } from './thread-table';

describe('ThreadTable', () => {
  let component: ThreadTable;
  let fixture: ComponentFixture<ThreadTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
