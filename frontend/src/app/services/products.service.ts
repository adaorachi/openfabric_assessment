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

  getProducts(callback: any) {
    return this.http
      .get<Product[]>(`${this.ROOT_URL}`)
      .subscribe((products: Product[]) => {
        callback(products);
      });
  }

  createProduct(payload: Product, callback: any) {
    return this.http
      .post<Product>(`${this.ROOT_URL}`, payload, this.httpOptions)
      .subscribe(
        () => {
          callback();

          this.showNotification('success', 'Product successfully created!');
        },
        (error) => {
          this.showNotification(
            'error',
            `${JSON.stringify(error?.error?.message)}`
          );
        }
      );
  }

  editProduct(productId: string, payload: Product, callback: any) {
    return this.http
      .patch<Product>(
        `${this.ROOT_URL}/${productId}`,
        payload,
        this.httpOptions
      )
      .subscribe(
        () => {
          callback();

          this.showNotification('success', 'Product successfully edited!');
        },
        (error) => {
          this.showNotification(
            'error',
            `${JSON.stringify(error?.error?.message)}`
          );
        }
      );
  }

  deleteProduct(productId: string, callback: any) {
    return this.http
      .delete<Product>(`${this.ROOT_URL}/${productId}`)
      .subscribe((product: Product) => {
        callback(product);

        this.showNotification('success', 'Product successfully deleted!');
      });
  }

  private showNotification(type: string, message: string) {
    this.notifier.notify(type, message);
  }
}
