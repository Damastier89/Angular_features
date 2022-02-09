import { FbCreateResponse } from './../interfaces/fbCreateResponse';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Article } from '../interfaces/article';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  public createArticle(article: Article): Observable<Article> {
    return this.http.post<any>(`${environment.fbDbUrl}/article.json`, article).pipe(
      map((response: FbCreateResponse) => {
        return {
          ...article,
          id: response.name,
          date: new Date(article.date)
        }
      })
    )
  }
}