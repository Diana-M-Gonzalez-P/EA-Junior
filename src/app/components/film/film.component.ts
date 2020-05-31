import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  film: any;
  param: any;
  return = '';
  search = '';
  season = '';
  episodes = [];

  constructor( private route: ActivatedRoute, private films: FilmsService ) { }

  ngOnInit(): void {
    this.season = '1';
    this.infoFilm();
  }

  infoFilm(){
    this.route.params
    .subscribe( param => {
      this.param = param;
      this.return = param.pag;
      if (param.search){
        this.search = param.search;
      }
      this.films.getFilm(param.id)
      .subscribe( resp => {
        this.film = resp;
        this.getSeasons(this.param.id, '1');
      });
    });
  }

  getIdSeason( id ) {
    this.getSeasons(this.param.id, id);
  }

  getSeasons( param, id ){
    this.season = id;
    this.films.getSeasons(param, id)
    .subscribe( resp => {
      // console.log(resp);
      // tslint:disable-next-line: no-string-literal
      this.episodes = resp['episodes'];
    });
  }

}
