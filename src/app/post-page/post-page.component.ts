import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {
  post$!: Observable<Post>;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
    ) {
    this.post$ = this.route.params.pipe(
      switchMap((params) => {
        return this.postsService.getById(params['id']);
      })
    );
  };
}
