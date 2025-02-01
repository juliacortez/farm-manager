import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../error.service';

@Injectable()
export class FarmService {
  api_url: string = 'http://localhost:5051/api/';

  constructor(
    public http: HttpClient,
    public error: ErrorService
  ) {}

  index() {
    let request = this.http.get(this.api_url + 'farm/');
    return request;
  }

  /**
   *
   * @param data
   */

  view(data: any) {
    let request = this.http.get(this.api_url + 'farm/' + data);
    return request;
  }

  /**
   *
   * @param data
   */
  store(data: any) {
    let request = this.http.post(this.api_url + 'farm/', data);
    return request;
  }

  /**
   *
   * @param data
   */

  update(data: any) {
    let request = this.http.put(this.api_url + 'farm/' + data.id, data);
    return request;
  }

  /**
   *
   * @param data
   */

  delete(data: number) {
    let request = this.http.delete(this.api_url + 'farm/' + data);
    return request;
  }
}
