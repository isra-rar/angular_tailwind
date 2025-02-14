import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-google',
  standalone: true,
  imports: [],
  templateUrl: './button-google.component.html',
  styleUrl: './button-google.component.scss'
})
export class ButtonGoogleComponent {
  
  @Output() onClick = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}
