import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, flatMap, map, switchMap, tap } from 'rxjs/operators';
import { Photo, emptyPhoto } from './photo';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhotosService {

  private baseUrl = 'https://photoslibrary.googleapis.com/v1/mediaItems';

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get(this.baseUrl, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }).pipe( delay(1000), map((x: any) => x.mediaItems) )
  }

  create(description, photoFile, blobBuffer) {
    return this.httpClient.post(this.baseUrl + '/uploads', {
      "media-binary-data": blobBuffer
    }, {
      responseType: 'text',
      headers: new HttpHeaders({
        "Content-type": "application/octet-stream",
        "Accept": "application/text",
        "X-Goog-Upload-Content-Type": photoFile.type,
        "X-Goog-Upload-Protocol": "raw"
      })
    }).pipe(flatMap((x) => this.httpClient.post(this.baseUrl + ':batchCreate', {
      newMediaItems: [
        {
          description: photoFile.description,
          simpleMediaItem: {
            uploadToken: x,
            fileName: photoFile.name
          }
        }
      ]
    })));
  }

  getUrlForId(id) {
    return `${this.baseUrl}/${id}`;
  }

  update(model) {
    return this.httpClient.put(this.getUrlForId(model.id), model).pipe(
      map((x: any) => ({...x, id: x.resourceName}))
    )
  }

  delete(modelId) {
    return this.httpClient.delete(this.getUrlForId(modelId))
  }
}
