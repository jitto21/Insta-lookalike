import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { PostModel } from './post.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts: PostModel[] = [];
  pageNumber: number = 1;
  public moreMsg: boolean = true;
  public commentMsg: boolean = true;
  public loading: boolean = false;;
  private bookmarkedPosts: PostModel[];

  constructor(private homeService: HomeService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPosts(this.pageNumber);
  }

  onScrollDown() {
    // this.pageNumber++;
    // this.getPosts(this.pageNumber);
    // console.log("scrolling down ",this.pageNumber);
  }

  getPosts(pageNum: number) {
    this.loading = true;
    this.homeService.getPosts(pageNum)
      .subscribe((resData) => {
        this.loading = false;
        console.log(resData);
        this.posts.push(...resData);
        
        if(this.posts.length > 30) {
          this._snackBar.open("Posts Limit Reached", "OK", {
            duration: 2000,
          });
        return;
        }

        try {
          this.bookmarkedPosts = this.homeService.getBookmarkPosts().bookmarkedPosts;
          this.bookmarkedPosts.forEach(bPost => {
            this.posts.map(post=> {
              if(bPost.author === post.author) {
                post.bookmark = bPost.bookmark;
              }
            })
          }) 
        } catch (error) {
          
        }
        console.log("Posts ==> ", this.posts);
      },(error)=> this.loading = false);
  }

  onClickMore(post: PostModel) {
    this.moreMsg = !this.moreMsg;
    post.more = !post.more;
  }

  onViewComments(post: PostModel) {
    this.homeService.getComments()
      .subscribe((resData: any) => {
        console.log(resData);
        post.comments = resData;
        this.commentMsg = !this.commentMsg;
      })
  }

  onBookmarkPost(post: PostModel) {
    post.bookmark = !post.bookmark;
    console.log("Boomkark=> ", post);
    this.homeService.bookmarkPost(post);
    if(post.bookmark) {
      this._snackBar.open("Saved to Bookmarks", "OK", {
        duration: 2000,
      });
    } else {
      this._snackBar.open("Removed from Bookmarks", "", {
        duration: 2000,
      });
    }

  }

  onLikePost(post: PostModel) {
    post.like = !post.like;
    console.log("Like=> ", post.like)

  }

  isBookmarked(post: PostModel) {
    return post.bookmark;
  }

}
