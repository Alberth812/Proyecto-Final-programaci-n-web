import { TestBed } from '@angular/core/testing';

import { Concierto } from './concierto';

describe('Concierto', () => {
  let service: Concierto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Concierto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
