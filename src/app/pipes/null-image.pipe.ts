import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullImage'
})
export class NullImagePipe implements PipeTransform {

  transform( film: any, poster: boolean = false ): any {
    const url = 'https://image.tmdb.org/t/p/w440_and_h660_face/';
    if (poster) {
      return url + film.poster_path;
    }
    if (!film) {
        return;
    }
    if ( film.poster_path ) {
      return url + film.poster_path;
    } else {
      if ( film.backdrop_path ) {
          return url + film.backdrop_path;
      } else {
        return 'assets/img/no-img.png';
      }
    }
  }

}
