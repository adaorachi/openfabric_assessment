import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Category from 'src/app/models/category';

import Product from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { categories } from 'src/app/utils/constants';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  id!: string;
  product!: Product;
  categories!: Category[];
  isAddMode!: boolean;
  submitting: boolean = false;
  buttonText: string;
  isAuthenticated: boolean = false;

  private authenticatedSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authenticatedSub = this.authService
      .getAuthenticatedSub()
      .subscribe((status) => {
        this.isAuthenticated = status;
      });

    this.isAuthenticated = this.authService.getIsAuthenticated();

    this.product = history.state.data;
    this.id = this.route.snapshot.params['productId'];
    this.isAddMode = !this.id;

    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.productForm.patchValue(this.product);
      this.buttonText = 'Add product';
    }
  }

  getCategoryList() {
    return (this.categories = categories.filter((i) => i.value !== 'all'));
  }

  onCreateProduct(payload: Product) {
    this.productService.createProduct(payload, () => {
      this.submitting = false;
      this.productForm.reset();
       this.router.navigate(['/manage-products']);
    });
  }

  onEditProduct(productId: string, payload: Product) {
    this.productService
      .editProduct(productId, payload, () => {
        this.submitting = false;
        this.router.navigate(['/manage-products']);
      });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.submitting = true;
    const payload = this.productForm.value;

    if (this.isAddMode) {
      this.onCreateProduct(payload);
    } else {
      this.onEditProduct(this.id, payload);
    }
  }

  ngOnDestroy() {
    this.authenticatedSub.unsubscribe();
  }
}
