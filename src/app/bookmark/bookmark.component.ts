import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { PostModel } from '../home/post.model';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  public bookmarkedPosts: PostModel[]

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.bookmarkedPosts = this.homeService.getBookmarkPosts().bookmarkedPosts;
    console.log("In Bookmark ==> ", this.bookmarkedPosts);
  }

  onClickMore(post: PostModel) {
    post.more = !post.more;
  }

}
