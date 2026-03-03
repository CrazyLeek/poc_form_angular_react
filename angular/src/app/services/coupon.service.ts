import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CouponValidationResponse {
  valid: boolean;
  code: string;
  message: string;
  discountPercent?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private static readonly NETWORK_LATENCY_MS = 500;

  validateCoupon(code: string): Observable<CouponValidationResponse> {
    const normalizedCode = code.trim().toUpperCase();

    const response: CouponValidationResponse =
      normalizedCode === 'SOLUTAP2026'
        ? {
            valid: true,
            code: normalizedCode,
            message: 'Code promo appliqué !',
            discountPercent: 25,
          }
        : {
            valid: false,
            code: normalizedCode,
            message: 'Code promo invalide.',
          };

    return new Observable<CouponValidationResponse>((subscriber) => {
      const timerId = setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, CouponService.NETWORK_LATENCY_MS);

      return () => clearTimeout(timerId);
    });
  }
}
