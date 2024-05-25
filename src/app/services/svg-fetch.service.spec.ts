import { TestBed } from '@angular/core/testing';

import { SvgFetchService } from './svg-fetch.service';

describe('SvgFetchService', () => {
  let service: SvgFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
