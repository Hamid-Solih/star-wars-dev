import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreHTTPService } from './http.service';

@Injectable({ providedIn: 'root' })
export class CoreDataService extends CoreHTTPService {
  constructor(http: HttpClient) {
    super(http);
  }
}
