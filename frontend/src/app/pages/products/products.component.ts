import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import Category from 'src/app/models/category';
import Product from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { truncate } from 'src/app/utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [LoaderComponent]
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isGettingProducts: boolean = false;

  constructor(private productService: ProductsService) { }
  
  ngOnInit() {
    this.isGettingProducts = true
    this.productService.getProducts()
      .subscribe((products: Product[]) => {
        this.products = products
        this.filteredProducts = products
        this.isGettingProducts = false
      })
  }

  onFilterByCategory(category: Category) {
    if (category.value === 'all') {
      this.filteredProducts = [...this.products]
    } else {
      this.filteredProducts = this.products.filter((item: Product) => {
        return item.category === category.value;
      })
    }
  }

  truncateString(str: string) {
    return truncate(str, 100)
  }
}
