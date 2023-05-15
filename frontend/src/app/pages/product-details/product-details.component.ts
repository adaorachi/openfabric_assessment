import { Component } from '@angular/core';
import { Location } from '@angular/common';
import Product from 'src/app/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product!: Product;

  constructor(private location: Location) {}

  ngOnInit() {
    this.product = history.state.data;
  }

  goBack() {
    this.location.back();
  }
}
