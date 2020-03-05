import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromPhotos from './reducer';
import * as photosActions from './actions';
import {
  selectAllPhotos,
  selectPhoto,
  selectPhotosLoading
} from './selectors';
import { Photo } from '@google-images/core-data';

@Injectable({ providedIn: 'root' })
export class PhotosFacade {
  allPhotos$ = this.store.pipe(select(selectAllPhotos));
  selectedPhoto$ = this.store.pipe(select(selectPhoto));
  photoLoading$ = this.store.pipe(select(selectPhotosLoading));

  constructor(
    private store: Store<fromPhotos.PhotosPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectPhoto(selectedPhotoId: any) {
    this.dispatch(photosActions.photoSelected({ selectedPhotoId }));
  }

  loadPhotos() {
    this.dispatch(photosActions.loadPhotos());
  }

  async createPhoto(photo: any) {
    const description = photo.description;
    const blobBuffer = await photo.photo.arrayBuffer();
    this.dispatch(photosActions.createPhoto({ ...photo, blobBuffer }));
  }

  updatePhoto(photo: Photo) {
    this.dispatch(photosActions.updatePhoto({ photo }));
  }

  savePhoto(photo: Photo) {
    if(photo.id) {
      this.updatePhoto(photo)
    } else {
      this.createPhoto(photo);
    }
    this.selectPhoto(null);
  }

  deletePhoto(photoId: any) {
    this.dispatch(photosActions.deletePhoto({ photoId }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
