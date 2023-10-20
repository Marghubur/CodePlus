import { TestBed } from '@angular/core/testing';

import { JwtIntercpetorInterceptor } from './jwt-intercpetor.interceptor';

describe('JwtIntercpetorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtIntercpetorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtIntercpetorInterceptor = TestBed.inject(JwtIntercpetorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
