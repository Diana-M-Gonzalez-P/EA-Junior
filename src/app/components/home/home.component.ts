import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filmsPopular: any;
  arrayAllInfo = [];
  miniCard = [];

  constructor( public films: FilmsService) { }

  ngOnInit(): void {
    this.getFilmsPopular();
  }

  getFilmsPopular(){
    this.films.getPopular()
    .subscribe( resp => {
        // tslint:disable-next-line: no-string-literal
        const resultArray = resp['results'];
        resultArray.forEach(element => {
            this.films.getActors(element.id)
            .subscribe( actors => {
              // tslint:disable-next-line: no-string-literal
              element.cast = actors['cast'];
            });
            this.arrayAllInfo.push(element);
        });
        this.miniCard = this.arrayAllInfo.slice(0, 8);
        // console.log(this.miniCard);
        return this.filmsPopular = this.miniCard;
    });
  }

  onScroll() {
    if ( this.miniCard.length < this.arrayAllInfo.length ){
      const len = this.miniCard.length;
      for (let i = len; i <= len + 2; i++){
        this.miniCard.push(this.arrayAllInfo[i]);
      }
    }
    // console.log(this.miniCard.length < this.arrayAllInfo.length);
    // console.log('miniCard', this.miniCard.length);
    // console.log('original', this.arrayAllInfo.length);
  }

}
