import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../error.service';

@Injectable()
export class AnimalService {
  constructor(
    public http: HttpClient,
    public error: ErrorService
  ) {}

  index() {
    let request = this.http.get(environment.api_url + 'animal/');
    return request;
  }

  /**
   *
   * @param data
   */

  view(data: any) {
    let request = this.http.get(environment.api_url + 'animal/' + data);
    return request;
  }

  /**
   *
   * @param data
   */
  store(data: any) {
    let request = this.http.post(environment.api_url + 'animal/', data);
    return request;
  }

  /**
   *
   * @param data
   */
  list(data: any) {
    let request = this.http.post(environment.api_url + 'animal/add-list', data);
    return request;
  }

  /**
   *
   * @param data
   */

  update(data: any) {
    let request = this.http.put(environment.api_url + 'animal/' + data.id, data);
    return request;
  }

  /**
   *
   * @param data
   */

  delete(data: number) {
    let request = this.http.delete(environment.api_url + 'animal/' + data);
    return request;
  }
}
