export interface PostModel {
    author: string,
    imagePath: string,
    title: string,
    description: string,
    content: string,
    publishedAt: Date,
    comments: string[],
    like: boolean,
    bookmark: boolean,
    more: boolean
}