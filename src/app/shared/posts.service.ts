import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { FBCreateResponse, Post } from './interfaces';
import { environment } from '../../environments/environment';


@Injectable({providedIn: "root"})
export class PostsService {
  constructor(private http: HttpClient) {};

  create(post: Post): Observable<Post> {
    return this.http.post<FBCreateResponse>(`${environment.FbDBUrl}/posts.json`, post)
      .pipe(map((response: FBCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
        }));
  };

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.FbDBUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))
      }));
  };

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.FbDBUrl}/posts/${id}.json`)
      .pipe(map((post: Post)=> {
        return {
          ...post, id,
          date: new Date(post.date)
        }
      }));
  };

  delete(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.FbDBUrl}/posts/${id}.json`);
  };

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.FbDBUrl}/posts/${post.id}.json`, post);
  };
}
