import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Post } from '../../shared/interfaces';
import { PostsService } from '../../shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  search = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {};

  ngOnInit() {
   this.postsService.getAll()
     .pipe(takeUntil(this.destroy$))
     .subscribe(posts => {
      this.posts = posts;
    });
  };

  remove(id: string | undefined) {
    this.postsService.delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.posts = this.posts.filter(post => post.id !==  id);
      this.alert.danger('The post has been deleted');
    });
  };

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  };
}
