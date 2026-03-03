import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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
  private readonly httpClient = inject(HttpClient);

  validateCoupon(code: string): Observable<CouponValidationResponse> {
    return this.httpClient.post<CouponValidationResponse>('/api/coupon/validate', { code });
  }
}
