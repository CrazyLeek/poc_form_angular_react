import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { startWith, take } from 'rxjs';
import { CouponService } from './services/coupon.service';
import { blockedEmailDomainValidator, positiveIntegerValidator } from './validators/form.validators';

export type AccountType = 'Gratuit' | 'Premium';
export type Gender = 'M' | 'Mme' | 'Autre';
export type PremiumPlan = 'monthly' | 'yearly';
export type TypingSite = 'RataType' | 'AgileFingers';
export type CouponUiState = 'idle' | 'loading' | 'success' | 'error';

export interface SignupFormPayload {
  lastName: string;
  firstName: string;
  gender: Gender;
  age: number;
  email: string;
  accountType: AccountType;
  premiumPlan: PremiumPlan | null;
  couponCode: string | null;
  tenFingers: boolean;
  typingSpeed: number;
  usedTypingSite: boolean;
  typingSite: TypingSite | null;
}

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly couponService = inject(CouponService);

  readonly accountTypes: AccountType[] = ['Gratuit', 'Premium'];
  readonly genders: Gender[] = ['M', 'Mme', 'Autre'];

  readonly form = new FormGroup({
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(40)],
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(40)],
    }),
    gender: new FormControl<Gender | null>(null, {
      validators: [Validators.required],
    }),
    age: new FormControl<number | null>(null, {
      validators: [Validators.required, positiveIntegerValidator],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, blockedEmailDomainValidator(['yopmail.com'])],
    }),
    accountType: new FormControl<AccountType | null>(null, {
      validators: [Validators.required],
    }),
    premiumPlan: new FormControl<PremiumPlan | null>(null),
    couponCode: new FormControl('', {
      nonNullable: true,
    }),
    tenFingers: new FormControl<boolean | null>(null, {
      validators: [Validators.required],
    }),
    typingSpeed: new FormControl<number | null>(null, {
      validators: [Validators.required, positiveIntegerValidator],
    }),
    usedTypingSite: new FormControl<boolean | null>(null, {
      validators: [Validators.required],
    }),
    typingSite: new FormControl<TypingSite | null>(null),
  });

  couponUiState: CouponUiState = 'idle';
  couponFeedback = '';
  submitFeedback = '';

  constructor() {
    this.setupAccountTypeDependencies();
    this.setupTypingSiteDependencies();
    this.setupCouponCodeReset();
  }

  get isPremium(): boolean {
    return this.form.controls.accountType.value === 'Premium';
  }

  get usedTypingSite(): boolean {
    return this.form.controls.usedTypingSite.value === true;
  }

  get isCouponLoading(): boolean {
    return this.couponUiState === 'loading';
  }

  validateCoupon(): void {
    if (!this.isPremium) {
      return;
    }

    const code = this.form.controls.couponCode.value.trim();

    if (!code) {
      this.couponUiState = 'error';
      this.couponFeedback = 'Veuillez saisir un code promo.';
      return;
    }

    this.couponUiState = 'loading';
    this.couponFeedback = '';

    this.couponService
      .validateCoupon(code)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.couponUiState = response.valid ? 'success' : 'error';
          this.couponFeedback = response.message;
        },
        error: (error: HttpErrorResponse) => {
          this.couponUiState = 'error';
          this.couponFeedback = this.resolveCouponErrorMessage(error);
        },
      });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.submitFeedback = 'Le formulaire contient des erreurs.';
      return;
    }

    const payload = this.buildPayload();
    console.log('Signup payload', payload);
    this.submitFeedback = 'Compte créé avec succès (simulation).';
  }

  private buildPayload(): SignupFormPayload {
    const formValue = this.form.getRawValue();

    return {
      lastName: formValue.lastName.trim(),
      firstName: formValue.firstName.trim(),
      gender: formValue.gender as Gender,
      age: Number(formValue.age),
      email: formValue.email.trim(),
      accountType: formValue.accountType as AccountType,
      premiumPlan: this.isPremium ? formValue.premiumPlan : null,
      couponCode: this.isPremium && this.couponUiState === 'success' ? formValue.couponCode.trim() : null,
      tenFingers: formValue.tenFingers as boolean,
      typingSpeed: Number(formValue.typingSpeed),
      usedTypingSite: formValue.usedTypingSite as boolean,
      typingSite: this.usedTypingSite ? formValue.typingSite : null,
    };
  }

  private resolveCouponErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 400) {
      return error.error?.message ?? 'Code promo invalide.';
    }

    if (error.status === 500) {
      return error.error?.message ?? 'Erreur technique, veuillez réessayer plus tard.';
    }

    return 'Une erreur réseau est survenue.';
  }

  private setupAccountTypeDependencies(): void {
    this.form.controls.accountType.valueChanges
      .pipe(startWith(this.form.controls.accountType.value), takeUntilDestroyed())
      .subscribe((accountType) => {
        const premiumPlanControl = this.form.controls.premiumPlan;

        if (accountType === 'Premium') {
          premiumPlanControl.setValidators([Validators.required]);
        } else {
          premiumPlanControl.clearValidators();
          premiumPlanControl.setValue(null, { emitEvent: false });
          this.form.controls.couponCode.setValue('', { emitEvent: false });
          this.couponUiState = 'idle';
          this.couponFeedback = '';
        }

        premiumPlanControl.updateValueAndValidity({ emitEvent: false });
      });
  }

  private setupTypingSiteDependencies(): void {
    this.form.controls.usedTypingSite.valueChanges
      .pipe(startWith(this.form.controls.usedTypingSite.value), takeUntilDestroyed())
      .subscribe((usedTypingSite) => {
        const typingSiteControl = this.form.controls.typingSite;

        if (usedTypingSite === true) {
          typingSiteControl.setValidators([Validators.required]);
        } else {
          typingSiteControl.clearValidators();
          typingSiteControl.setValue(null, { emitEvent: false });
        }

        typingSiteControl.updateValueAndValidity({ emitEvent: false });
      });
  }

  private setupCouponCodeReset(): void {
    this.form.controls.couponCode.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.couponUiState === 'success' || this.couponUiState === 'error') {
        this.couponUiState = 'idle';
        this.couponFeedback = '';
      }
    });
  }
}
