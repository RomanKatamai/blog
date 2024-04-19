import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { Post } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';
import { PostsService } from '../../shared/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnDestroy {
  form!: FormGroup;
  post!: Post;
  destroy$: Subject<boolean> = new Subject<boolean>();
  submitted = false;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
        description: new FormControl(post.description, [Validators.required, Validators.maxLength(160)])
      });
    });
  };

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  submit() {
    if(this.form.invalid){
      return
    }

    this.submitted = true;

    this.postsService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
      description: this.form.value.description
    }).pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.submitted = false
      this.router.navigate(['/admin', 'dashboard'])
      this.alert.success('The post has been changed')
    });
  };
}
