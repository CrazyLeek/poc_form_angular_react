import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function positiveIntegerValidator(control: AbstractControl): ValidationErrors | null {
  const rawValue = control.value;

  if (rawValue === null || rawValue === undefined || rawValue === '') {
    return null;
  }

  const parsed = Number(rawValue);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return { positiveInteger: true };
  }

  return null;
}

export function blockedEmailDomainValidator(blockedDomains: string[]): ValidatorFn {
  const normalizedBlockedDomains = blockedDomains.map((domain) => domain.toLowerCase());

  return (control: AbstractControl): ValidationErrors | null => {
    const rawValue = control.value;

    if (typeof rawValue !== 'string' || rawValue.trim() === '') {
      return null;
    }

    const email = rawValue.trim().toLowerCase();
    const atIndex = email.lastIndexOf('@');

    if (atIndex < 0 || atIndex === email.length - 1) {
      return null;
    }

    const domain = email.slice(atIndex + 1);

    if (normalizedBlockedDomains.includes(domain)) {
      return {
        blockedDomain: {
          domain,
        },
      };
    }

    return null;
  };
}
