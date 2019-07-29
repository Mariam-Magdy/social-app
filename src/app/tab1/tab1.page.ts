import { Component, OnInit } from '@angular/core';
import { postInterface } from '../interface';
import { Tab1Service } from '../tab1.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  postTime = 2.15;
  posts: postInterface[];
  users: Observable<any[]>;
  relative = this.database.object('users');
  listRef = this.database.list('users');
  // shirtsRef = this.database.list('shirts');

  public uploadTask: firebase.storage.UploadTask;
  constructor(private service: Tab1Service, public database: AngularFireDatabase) {
    this.users = database.list('users').valueChanges();
    // this.relative.set({username: 'new name!'});
    this.relative.valueChanges().subscribe(resp => console.log(resp));
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.service.getData().subscribe(resp => this.posts = resp);
  }

  addPost(newData: any) {
    this.listRef.push({post: newData.value}).then(
      resp => this.users.subscribe(res => console.log(res))
      );
    newData = '';
    console.log('listRef');
    // this.service.addPost(newData).pipe().subscribe(resp => this.posts = resp);
    // this.postsRef.push({ text: newData });
    // console.log('fe', newData);
    // this.relative.update({post: newData.value});
  }

  // remove($key) {
  //   this.arr.remove($key);
  // }
}
