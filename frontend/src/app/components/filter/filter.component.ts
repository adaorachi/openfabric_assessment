import { Component, EventEmitter, Output } from '@angular/core';
import Category from 'src/app/models/category';
import { categories } from 'src/app/utils/constants';

@Component({
  selector: 'filter-widget',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  categories: Category[] = categories;
  category: Category = categories[0];

  @Output() categoryValueEvent = new EventEmitter<any>();

  getCategoryValue(category: Category) {
    this.categoryValueEvent.emit(category);
    this.category = category;
  }
}
