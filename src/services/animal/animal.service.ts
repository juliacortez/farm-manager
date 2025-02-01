import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../error.service';

@Injectable()
export class AnimalService {
  api_url: string = 'http://localhost:5051/api/';

  constructor(
    public http: HttpClient,
    public error: ErrorService
  ) {}

  index() {
    let request = this.http.get(this.api_url + 'animal/');
    return request;
  }

  /**
   *
   * @param data
   */

  view(data: any) {
    let request = this.http.get(this.api_url + 'animal/' + data);
    return request;
  }

  /**
   *
   * @param data
   */
  store(data: any) {
    let request = this.http.post(this.api_url + 'animal/', data);
    return request;
  }

  /**
   *
   * @param data
   */
  list(data: any) {
    let request = this.http.post(this.api_url + 'animal/add-list', data);
    return request;
  }

  /**
   *
   * @param data
   */

  update(data: any) {
    let request = this.http.put(this.api_url + 'animal/' + data.id, data);
    return request;
  }

  /**
   *
   * @param data
   */

  delete(data: number) {
    let request = this.http.delete(this.api_url + 'animal/' + data);
    return request;
  }
}
