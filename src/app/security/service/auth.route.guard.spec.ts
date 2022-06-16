import { TestBed } from '@angular/core/testing';

import { Auth.RouteGuard } from './auth.route.guard';

describe('Auth.RouteGuard', () => {
  let guard: Auth.RouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Auth.RouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
