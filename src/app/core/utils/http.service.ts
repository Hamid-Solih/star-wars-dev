import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { PaginatedResult } from '../interfaces/paginated-result';
import { Person } from '../interfaces/person';
import { Film } from '../interfaces/film';
import { Planet } from '../interfaces/planet';
import { Specie } from '../interfaces/specie';
import { Starship } from '../interfaces/starship';
import { Vehicle } from '../interfaces/vehicle';

type KeyValuePair = { [key: string]: any | any[] };

export abstract class CoreHTTPService {
  protected get baseURL() {
    return 'https://swapi.dev/api/';
  }

  constructor(protected http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(url).pipe(shareReplay(1));
  }

  getPeople(
    params?: HttpParams | KeyValuePair
  ): Observable<PaginatedResult<Person[]>> {
    return this.http.get(this.baseURL + 'people/', {
      params,
    }) as Observable<PaginatedResult<Person[]>>;
  }

  getPlanets(params?: HttpParams | KeyValuePair) {
    return this.http.get(this.baseURL + 'planets/', {
      params,
    }) as Observable<PaginatedResult<Planet[]>>;
  }

  getFilms(params?: HttpParams | KeyValuePair) {
    return this.http.get(this.baseURL + 'films/', {
      params,
    }) as Observable<PaginatedResult<Film[]>>;
  }

  getSpecies(params?: HttpParams | KeyValuePair) {
    return this.http.get(this.baseURL + 'species/', {
      params,
    }) as Observable<PaginatedResult<Specie[]>>;
  }

  getVehicles(params?: HttpParams | KeyValuePair) {
    return this.http.get(this.baseURL + 'vehicles/', {
      params,
    }) as Observable<PaginatedResult<Vehicle[]>>;
  }

  getStarships(params?: HttpParams | KeyValuePair) {
    return this.http.get(this.baseURL + 'starships/', {
      params,
    }) as Observable<PaginatedResult<Starship[]>>;
  }
}
