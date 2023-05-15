import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import Product from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;

    httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     };
  
  constructor(private http: HttpClient) { 
    this.ROOT_URL = "http://localhost:5000/api/v1"
  }



  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.ROOT_URL}/get_products`)
      
  // }

  get(endpoint: string) {
    return this.http.get(`${this.ROOT_URL}/${endpoint}`)
  }

  post(endpoint: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${endpoint}`, payload, this.httpOptions)
  }

  patch(endpoint: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${endpoint}`, payload, this.httpOptions)
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.ROOT_URL}/${endpoint}`)
  }

}
