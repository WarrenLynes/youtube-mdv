import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthFacade } from '@youtube-player/core-state';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, OnDestroy {

  destroy$: Subject<boolean> = new Subject();

  constructor(private router: Router, private facade: AuthFacade) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|boolean {


    if(route.fragment && route.fragment.indexOf('access_token') > -1) {
      const token = {};
      console.log('canActivate');
      console.log(route.fragment);

      route.fragment.split('&').forEach((x) => {
        const split = x.split('=');
        token[split[0]] = split[1];
      });

      this.facade.setAccessToken(token['access_token']);
    }

    return this.facade.authenticated$.pipe(
      takeUntil(this.destroy$),
      map(x => {
        if(x && localStorage.getItem('access_token')) {
          return true;
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}
