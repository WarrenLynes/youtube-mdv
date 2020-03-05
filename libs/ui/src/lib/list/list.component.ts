import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from '@youtube-player/core-data';

@Component({
  selector: 'youtube-player-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() data: Video[];
  @Input() selected: Video;
  @Output() selectVideo = new EventEmitter<any>();
  @Output() deleteVideo = new EventEmitter<Video>();

  constructor() { }

  ngOnInit() {
  }
}
