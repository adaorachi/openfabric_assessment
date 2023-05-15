import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import Product from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isDeletingProduct: boolean = false;
  isGettingProducts: boolean = false;
  productId: string;
  isAuthenticated: boolean = false;

  authenticatedSub: Subscription;

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.authenticatedSub = this.authService
      .getAuthenticatedSub()
      .subscribe((status) => {
        this.isAuthenticated = status;
      });

    this.isAuthenticated = this.authService.getIsAuthenticated();

    if (this.isAuthenticated) {
      this.isGettingProducts = true;
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.products = products;
        this.isGettingProducts = false;
      });
    }
  }

  showNotification(type: string, message: string) {
    this.notifier.notify(type, message);
  }

  onDeleteProduct(productId: string) {
    this.productId = productId;
    this.isDeletingProduct = true;

    this.productService
      .deleteProduct(productId)
      .subscribe((product: Product) => {
        this.products = this.products.filter((i) => i._id !== product._id);
        this.isDeletingProduct = false;
        this.productId = '';

        this.showNotification('success', 'Product successfully deleted!');
      });
  }

  ngOnDestroy() {
    this.authenticatedSub.unsubscribe();
  }
}
