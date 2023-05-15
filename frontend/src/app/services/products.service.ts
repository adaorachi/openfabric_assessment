import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import Product from '../models/product';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private ROOT_URL = `${env.baseURL}/products`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private notifier: NotifierService) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.ROOT_URL}`);
  }

  getProduct(productId: string) {
    return this.http.get<Product>(`${this.ROOT_URL}/${productId}`);
  }

  createProduct(payload: Product) {
    return this.http.post<Product>(
      `${this.ROOT_URL}`,
      payload,
      this.httpOptions
    );
  }

  editProduct(productId: string, payload: Product) {
    return this.http.patch<Product>(
      `${this.ROOT_URL}/${productId}`,
      payload,
      this.httpOptions
    );
  }

  deleteProduct(productId: string) {
    return this.http.delete<Product>(`${this.ROOT_URL}/${productId}`);
  }
}
