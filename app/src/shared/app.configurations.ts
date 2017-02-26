import { Injectable } from '@angular/core';

@Injectable()
export class APIBaseConfig {
  public base_url: string = 'http://httpbin.org/';
  public api: string = 'get';
  public rest_endpoint: string = this.base_url + this.api;
}
