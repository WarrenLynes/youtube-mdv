import { Component, OnInit } from '@angular/core';
import { AuthFacade, VideosFacade } from '@youtube-player/core-state';
import { Observable } from 'rxjs';
import { Video } from '@youtube-player/core-data';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'youtube-player-videos',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class VideosComponent implements OnInit {

  videos$: Observable<Video[]> = this.facade.allVideos$;
  video$: Observable<Video> = this.facade.selectedVideo$;
  video: Video;

  constructor(
    private facade: VideosFacade,
  ) { }

  ngOnInit() {
    this.facade.loadVideos();

    this.facade.selectedVideo$.pipe(
      tap((x) => {
        if( x.id ) {
          this.video = x;
        }
      })
    ).subscribe();
  }

  onSelectVideo(videoId: any) {
    this.facade.selectVideo(videoId);
  }

  onDeleteVideo(video: Video) {
    this.facade.deleteVideo(video);
  }

  saveVideo(video: any) {
    if(video.id) {
      this.facade.updateVideo(video);
    } else {
      this.facade.createVideo(video);
    }
    this.reset();
  }

  reset() {
    this.facade.selectVideo(null);
  }
}
