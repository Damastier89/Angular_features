import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Article } from '../shared/interfaces/article';
import { ArticleService } from '../shared/services/article.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.scss']
})
export class EditArticlesComponent implements OnInit {
  public matcher = new MyErrorStateMatcher();
  public submitted: boolean = false;
  public form!: UntypedFormGroup;
  public article!: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.articleService.getArticleById(params['id']);
      })
    ).subscribe(article => {
      this.article = article;
      this.form = new UntypedFormGroup({
        title: new UntypedFormControl(this.article.title),
        content: new UntypedFormControl(this.article.content),
        author: new UntypedFormControl(this.article.author),
      });
    });
  }

  public editArticle() {}

}
