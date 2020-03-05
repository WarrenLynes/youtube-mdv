import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppFacade, AuthFacade } from '@youtube-player/core-state';
import { Observable, of, Subject } from 'rxjs';
import { filter, first, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'youtube-player-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authenticated$: Observable<boolean> = this.authFacade.authenticated$;
  destroy$: Subject<boolean> = new Subject();
  loading: boolean;

  BASE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
  params = {
    'response_type': 'token',
    'redirect_uri': 'https:%2F%2Fshays30430youtube-mdv.surge.sh',
    // 'redirect_uri': 'http://localhost:4200',
    'client_id': '378727057522-9vgo0jes3b9nmitu8lbjp5sjfkf0hn0b.apps.googleusercontent.com',
    'scope': 'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube'
  };
  links = [
    {path: '', title: 'videos', icon: 'access_time'},
  ];

  constructor(
    private authFacade: AuthFacade,
    private appFacade: AppFacade,
    private cdRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.appFacade.initialize();

    this.authFacade.authenticated$.pipe(
      withLatestFrom(this.authFacade.accessToken$),
      filter(([x, y]) => x && !y),
      first(),
      map(() => this.onAuthenticate())
    ).subscribe();

    this.appFacade.loading$.pipe(takeUntil(this.destroy$)).subscribe((x) => {
      if (x !== this.loading) {
        this.loading = x;
        this.cdRef.detectChanges()
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onLogout() {
    this.authFacade.logout();
  }

  onAuthenticate() {
    window.location.replace(this.BASE_URL + '?response_type=' + this.params.response_type + '&redirect_uri=' + this.params.redirect_uri + '&client_id=' + this.params.client_id + '&scope=' + this.params.scope);
  }
}
