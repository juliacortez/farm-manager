import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;

  constructor() {}
}
