import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { postInterface } from './interface';

@Injectable({
  providedIn: 'root'
})
export class Tab1Service {

  constructor(private http: HttpClient) { }

  getData(): Observable<postInterface[]> {
    return this.http.get<postInterface[]>('https://jsonplaceholder.typicode.com/users');
  }

  addPost(newPost: string) {
    return this.http.post('https://jsonplaceholder.typicode.com/post', newPost);
  }
}
