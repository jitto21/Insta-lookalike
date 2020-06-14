import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { PostModel } from './post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: PostModel[];
  private bookmarkedPosts: PostModel[];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getPosts()
      .subscribe((resData: PostModel[]) => {
        console.log(resData);
        this.posts = resData;
        this.bookmarkedPosts = this.homeService.getBookmarkPosts().bookmarkedPosts;
        this.bookmarkedPosts.forEach(bPost => {
          this.posts.map(post=> {
            if(bPost.author === post.author) {
              post.bookmark = bPost.bookmark;
            }
          })
        })
        console.log("Posts ==> ", this.posts);
      })
  }

  onClickMore(post: PostModel) {
    post.more = !post.more;
  }

  onViewComments(post: PostModel) {
    this.homeService.getComments()
      .subscribe(resData => {
        console.log(resData);
      })
  }

  onBookmarkPost(post: PostModel) {
    post.bookmark = !post.bookmark;
    console.log("Boomkark=> ", post);
    this.homeService.bookmarkPost(post);
  }

  onLikePost(post: PostModel) {
    post.like = !post.like;
    console.log("Like=> ", post.like)

  }

  isBookmarked(post: PostModel) {
    return post.bookmark;
  }

}
