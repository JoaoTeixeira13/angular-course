import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, catchError, throwError, tap } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  postsApi: string = require('./secrets.json').API + 'posts.json';
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    // Send Http request
    this.http
      .post<{ name: string }>(this.postsApi, postData, { observe: 'response' })
      .subscribe(
        (responseData) => {
          console.log('response from post request is', responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(this.postsApi, {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: new HttpParams().set('print', 'pretty'),
      })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          //error handling
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(this.postsApi, { observe: 'events', responseType: 'json' })
      .pipe(
        tap((event) => {
          console.log('tapped event is ', event);
          if (event.type === HttpEventType.Sent) {
            //...
          }
          if (event.type === HttpEventType.Response) {
            console.log('event body', event.body);
          }
        })
      );
  }
}
