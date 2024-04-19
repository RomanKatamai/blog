import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from '../../shared/interfaces';
import { PostsService } from '../../shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {
  form!: FormGroup;
  disabled = false;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private alert: AlertService
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      description: new FormControl(null, [Validators.required, Validators.maxLength(160)])
    })
  };

  submit() {
    if(this.form.invalid) {
      return
    }

    this.disabled = true;

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
      description: this.form.value.description
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.alert.success('The post has been created');
      this.disabled = false;
    });
  };
}
