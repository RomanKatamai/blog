import { Component, Input } from '@angular/core';
import { PostsService } from "../../posts.service";
import { Post } from "../../interfaces";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post!: Post;
  constructor(private postsService: PostsService) {};
}
