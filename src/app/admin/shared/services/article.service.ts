import { FbCreateResponse } from '../interfaces/fbCreateResponse';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ArticleInterface } from '../interfaces/article.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const environments = environment.fbDbUrl;
@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    public load(): Promise<any> {
        return this.getAllArticles()
            .toPromise()
            .catch((err: any) => Promise.resolve());
    }

    constructor(private http: HttpClient) {}

    public createArticle(article: ArticleInterface): Observable<ArticleInterface> {
        return this.http.post<any>(`${environments}/article.json`, article).pipe(
            map((response: FbCreateResponse) => {
                return {
                    ...article,
                    id: response.name,
                    date: new Date(article.date),
                };
            }),
        );
    }

    public getAllArticles(): Observable<ArticleInterface[]> {
        return this.http.get<ArticleInterface>(`${environments}/article.json`).pipe(
            map((response: { [key: string]: any }) => {
                return Object.keys(response).map((key) => ({
                    ...response[key],
                    id: key,
                    date: new Date(response[key].date),
                }));
            }),
        );
    }

    public getArticleById(id: string): Observable<ArticleInterface> {
        return this.http.get<ArticleInterface>(`${environments}/article/${id}.json`).pipe(
            map((article: ArticleInterface) => {
                return {
                    ...article,
                    id,
                    date: new Date(article.date),
                };
            }),
        );
    }

    public updateArticle(article: ArticleInterface): Observable<ArticleInterface> {
        return this.http.patch<ArticleInterface>(`${environments}/article/${article.id}.json`, article);
    }

    public removeArticle(id: string): Observable<void> {
        return this.http.delete<void>(`${environments}/article/${id}.json`);
    }
}
