import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private apiKEY = 'b2907782d07859a652052d3bae537475';
  private movieURL = 'https://api.themoviedb.org/3';

  constructor( private http: HttpClient ) { }

  private getURL(request: string, language: string): string {
    return `${this.movieURL}${request}api_key=${this.apiKEY}&language=${language}`;
  }

  getPopular() {
    const request = '/discover/tv?sort_by=popularity.desc&';
    const urlConsult = this.getURL(request, 'es');
    return this.http
           .get(urlConsult)
           .pipe(map(data => data));
  }

  getSearch( text: string ){
    const request = `/search/tv?query=${ text }&sort_by=popularity.desc&`;
    const urlConsult = this.getURL(request, 'es');
    return this.http
                .get(urlConsult)
                .pipe(map(data => data));
  }

  getFilm( id: string ){
    const request = `/tv/${ id }?`;
    const urlConsult = this.getURL(request, 'es');
    return this.http
                .get(urlConsult)
                .pipe(map(data => data));
  }

  getSeasons( id: string, season: string ){
    const request = `/tv/${ id }/season/${season}?`;
    const urlConsult = this.getURL(request, 'es');
    return this.http
                .get(urlConsult)
                .pipe(map(data => data));
  }

  getActors( id: string ){
    const request = `/tv/${ id }/credits?`;
    const urlConsult = this.getURL(request, 'es');
    return this.http
                .get(urlConsult)
                .pipe(map(data => data));
  }
}
