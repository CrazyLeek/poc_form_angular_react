import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import type { AccountType, CouponUiState, SignupFormGroup } from '../../app';
import { MainButtonComponent } from '../main-button/main-button.component';

@Component({
  selector: 'app-account-type-section',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MainButtonComponent,
  ],
  templateUrl: './account-type-section.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class AccountTypeSectionComponent {
  @Input({ required: true }) form!: SignupFormGroup;
  @Input({ required: true }) accountTypes!: AccountType[];
  @Input({ required: true }) isPremium = false;
  @Input({ required: true }) isCouponLoading = false;
  @Input({ required: true }) couponUiState!: CouponUiState;
  @Input({ required: true }) couponFeedback = '';

  @Output() validateCoupon = new EventEmitter<void>();

  onValidateCoupon(): void {
    this.validateCoupon.emit();
  }
}
