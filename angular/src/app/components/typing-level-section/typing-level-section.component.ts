import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import type { SignupFormGroup, TypingSite } from '../../app';

interface TypingSiteToggleEvent {
  site: TypingSite;
  checked: boolean;
}

@Component({
  selector: 'app-typing-level-section',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRadioModule],
  templateUrl: './typing-level-section.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class TypingLevelSectionComponent {
  @Input({ required: true }) form!: SignupFormGroup;
  @Input({ required: true }) typingSites!: TypingSite[];
  @Input({ required: true }) usedTypingSite = false;

  @Output() typingSiteToggled = new EventEmitter<TypingSiteToggleEvent>();

  onTypingSiteToggle(site: TypingSite, checked: boolean): void {
    this.typingSiteToggled.emit({ site, checked });
  }
}
