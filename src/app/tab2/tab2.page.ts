import { Component, OnInit } from '@angular/core';
import { postInterface } from '../interface';
import { Tab1Service } from '../tab1.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  arr: AngularFireList<any>;
  messages$: Observable<any[]>;
  messages: postInterface[];
  constructor(private msgService: Tab1Service) {}

  ngOnInit() {
    this.getMsg();
  }

  getMsg() {
    this.msgService.getData().subscribe(resp => this.messages = resp);
  }

  filter(search) {
    this.messages$ = this.arr.snapshotChanges().pipe(
      map(changes => {
        changes = (search) ?
        // tslint:disable-next-line: no-shadowed-variable
        changes.filter(changes => changes.payload.val().text.toLowerCase().includes(search.toLowerCase())) :
        changes;
        // Sort Alphabetical X-Team
        changes = changes.sort((a, b) => a.payload.val().text.toLowerCase() < b.payload.val().text.toLowerCase() ? -1 : 1);
        // key and value X-Team
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
    }
    // console.log('after', this.messages);
    // let searchData = search;
    // searchData = searchData.toLocaleLowerCase();
    // const filtered = this.messages.filter(data => {
    //   return data.username.toLocaleLowerCase().search(searchData) !== -1
    //     ? true
    //     : false;
    // });
    // console.log('before', filtered);
  }

