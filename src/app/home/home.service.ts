import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { PostModel } from './post.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })

export class HomeService {
    private url = 'https://cookbookrecipes.in/test/index.php'
    private oldUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=52871604ab134b14a6cac9673865a2a5'
    bookmarkedPosts: PostModel[] = [];

    constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

    getPosts(pageNum: number) {
        this.saveToLocalStorage();
        return this.http.get<{ articles: any, status: string, totalResults: number }>
            (`${this.oldUrl}`)
            .pipe(map(obj => {
                console.log(obj);
                return obj.articles.map(post => {
                    return {
                        author: post.source.name,
                        imagePath: post.urlToImage,
                        title: post.title,
                        description: post.description,
                        content: post.content,
                        publishedAt: post.publishedAt,
                        comments: [],
                        like: false,
                        bookmark: false,
                        more: false
                    }
                })
            }))
    }

    getComments() {
        return this.http.get('https://cors-anywhere.herokuapp.com/https://cookbookrecipes.in/test.php');
    }

    bookmarkPost(post: PostModel) {
        this.bookmarkedPosts = JSON.parse(localStorage.getItem('bookmark')).bookmarkedPosts;
        if (post.bookmark) {
            this.bookmarkedPosts.push(post);

        } else {
            this.bookmarkedPosts = this.bookmarkedPosts.filter(postObj => {
                return postObj.author !== post.author
            })
        }
        console.log("Bookmarked Posts ==> ", this.bookmarkedPosts);
        this.saveToLocalStorage();
    }

    getBookmarkPosts() {
        return JSON.parse(localStorage.getItem('bookmark'));
    }

    private saveToLocalStorage() {
        console.log("Saving to Local Storage")
        let bookmark = {
            bookmarkedPosts: this.bookmarkedPosts
        }
        localStorage.setItem('bookmark', JSON.stringify(bookmark))
    }
}
