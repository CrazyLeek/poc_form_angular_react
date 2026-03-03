import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

type MainButtonType = 'button' | 'submit';
type MainButtonSize = 'default' | 'large';

@Component({
  selector: 'app-main-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.scss',
})
export class MainButtonComponent {
  @Input() label = '';
  @Input() type: MainButtonType = 'button';
  @Input() disabled = false;
  @Input() size: MainButtonSize = 'default';

  @Output() pressed = new EventEmitter<void>();

  onPressed(): void {
    this.pressed.emit();
  }
}
