import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { PostModel } from './post.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {

    bookmarkedPosts: PostModel[] = [];

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http.get<{ articles: any, status: string, totalResults: number }>
            ('https://newsapi.org/v2/top-headlines?country=us&apiKey=52871604ab134b14a6cac9673865a2a5')
            .pipe(map(obj => {
                console.log(obj);
                return obj.articles.map(post => {
                    return {
                        author: post.source.name,
                        imagePath: post.urlToImage,
                        title: post.title,
                        description: post.description,
                        comments: [],
                        like: false,
                        bookmark: false,
                        more: false
                    }
                })
            }))
    }

    getComments() {
        return this.http.get('http://cookbookrecipes.in/test.php');
    }

    bookmarkPost(post: PostModel) {
        
        if(post.bookmark) {
            this.bookmarkedPosts.push(post);

        } else {
            this.bookmarkedPosts = this.bookmarkedPosts.filter(postObj => {
                return postObj.author !== post.author
            })
        }
        console.log("Bookmarked Posts ==> ", this.bookmarkedPosts);
        let bookmark = {
            bookmarkedPosts: this.bookmarkedPosts
        }
        localStorage.setItem('bookmark', JSON.stringify(bookmark)) 
    }

    getBookmarkPosts() {
        return JSON.parse(localStorage.getItem('bookmark'));
    }
}