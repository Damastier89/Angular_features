import { FbCreateResponse } from './../interfaces/fbCreateResponse';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Article } from '../interfaces/article';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const env = environment.fbDbUrl;
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  public createArticle(article: Article): Observable<Article> {
    return this.http.post<any>(`${env}/article.json`, article)
    .pipe(
      map((response: FbCreateResponse) => {
        return {
          ...article,
          id: response.name,
          date: new Date(article.date)
        }
      })
    );
  }

  public getAllArticles(): Observable<Article[]> {
    return this.http.get<Article>(`${env}/article.json`)
    .pipe(
      map((response: {[key: string]: any}) => {
        return Object.keys(response).map( key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))
      })
    );
  } 

  public getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${env}/article/${id}.json`)
    .pipe(
      map((article: Article) => {
        return {
          ...article,
          id,
          date: new Date(article.date)
        }
      })
    );
  }

  public removeArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${env}/article/${id}.json`);
  }
  
}