import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader-widget',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  @Input() title: string = '';
}
