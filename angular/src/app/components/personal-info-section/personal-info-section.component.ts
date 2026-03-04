import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import type { Gender, SignupFormGroup } from '../../app';

@Component({
  selector: 'app-personal-info-section',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule],
  templateUrl: './personal-info-section.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class PersonalInfoSectionComponent {
  @Input({ required: true }) form!: SignupFormGroup;
  @Input({ required: true }) genders!: Gender[];
}
