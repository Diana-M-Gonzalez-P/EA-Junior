import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchItem = '';
  result = [];
  miniCard = [];
  searchForm: FormGroup;
  error = false;
  mensError: string;

  constructor(
    public films: FilmsService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.error = false;
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required, Validators.pattern('[^\@\#]+')]]
    });
  }

  get formS() { return this.searchForm.controls; }

  search(){
    if (this.searchItem.length === 0) {
      return;
    }
    this.films.getSearch( this.searchItem)
    .subscribe( resp => {
        // console.log(resp);
        // tslint:disable-next-line: no-string-literal
        this.result = resp['results'];
        this.result.forEach(element => {
          this.films.getActors(element.id)
          .subscribe( actors => {
            // tslint:disable-next-line: no-string-literal
            element.cast = actors['cast'];
          });
          this.result.push(element);
        });
        this.miniCard = this.result.slice(0, 7);
        if ( this.miniCard.length === 0){
          this.error = true;
          this.mensError = 'No se pudo retornar resultados';
        } else {
          this.error = false;
        }
      }, errorService => {
        console.log(errorService);
        this.error = true;
        this.mensError = 'No se pudo retornar resultados';
        this.result = [];
        this.miniCard = [];
      }
    );
  }

  validateForm(form){
    if (form.invalid) {
      this.result = [];
      this.miniCard = [];
    }
  }

  onScroll() {
    if ( this.miniCard.length < this.result.length ){
      const len = this.miniCard.length;
      for (let i = len; i <= len + 2; i++){
        this.miniCard.push(this.result[i]);
      }
    }
    // console.log(this.miniCard.length < this.result.length);
    // console.log('miniCard', this.miniCard.length);
    // console.log('original', this.result.length);
  }

}
