export interface PostModel {
    author: string,
    imagePath: string,
    title: string,
    description: string,
    comments: string[],
    like: boolean,
    bookmark: boolean,
    more: boolean
}