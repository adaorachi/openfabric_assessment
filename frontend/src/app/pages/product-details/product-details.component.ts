import { Component } from '@angular/core';
import { Location } from '@angular/common';
import Product from 'src/app/models/product';
import { startCase } from 'lodash';
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

  startCaseString(str: string) {
    return startCase(str);
  }

  goBack() {
    this.location.back();
  }
}
